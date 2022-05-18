import * as Rx from "rxjs";
import * as Ro from "rxjs/operators";
import { pathMatcher } from "@xania/router/lib/route/path-matcher";

export function route<T>(
  path: Path,
  view: View<T> | PromiseLike<View<T>>
): Route<T> {
  const matcher = pathMatcher(path);
  return {
    match: matcher,
    view,
  };
}

type Path = string[];

interface PathMatchResult {
  segment: router.Path;
  params: router.RouteParams;
}
export interface Route<T> {
  match(path: string[]): PathMatchResult;
  view: View<T> | PromiseLike<View<T>>;
}
type ViewFn<T> = () => T | PromiseLike<T>;
type ViewComponent<T> = { render(): T | PromiseLike<T>; routes?: Route<T>[] };
interface ViewConstructor<TView> {
  new (): ViewComponent<TView>;
}

type View<T> = T | ViewComponent<T> | ViewConstructor<T> | ViewFn<T>;

type ViewResolver<T> = (path: Path) => PromiseLike<ViewResolution<T>>;

interface ViewResolved<T> {
  view: T;
  segment: Path;
  params: router.RouteParams;
  resolve?: ViewResolver<T>;
}

interface ViewNotFound {
  path: Path;
}

type ViewResolution<T> = ViewResolved<T> | ViewNotFound;

/////////////////////////////////////////////////////////////////////

export function isPromiseLike<T>(
  x: View<T> | PromiseLike<View<T>>
): x is PromiseLike<View<T>> {
  return x && x["then"] instanceof Function;
}

function notFound(path: Path): ViewNotFound {
  return {
    path,
  };
}

function createViewResolver<T>(routes: Route<T>[]): ViewResolver<T> {
  if (!routes) return null;
  return (path: Path): PromiseLike<ViewResolution<T>> => {
    for (const route of routes) {
      const matchResult = route.match(path);
      if (matchResult) {
        const { segment, params } = matchResult;
        const { view } = route;
        if (isPromiseLike(view))
          return view.then((x) => asViewResolution(x, params, segment));
        else {
          return asViewResolution(view, params, segment);
        }
      }
    }

    return Promise.resolve(notFound(path));
  };

  function asViewResolution<T>(
    view: View<T>,
    params,
    segment
  ): PromiseLike<ViewResolution<T>> {
    if (view instanceof Function) {
      try {
        return asViewResolution((view as any)(), params, segment);
      } catch {
        const component = Reflect.construct(
          view as any,
          []
        ) as ViewComponent<T>;
        return asViewResolution(component, params, segment);
      }
    } else if (isViewComponent(view)) {
      const result = view.render();
      if (isPromiseLike(result)) {
        return result.then((x) => ({
          params,
          segment,
          view: x,
          resolve: createViewResolver(view.routes),
        }));
      } else {
        return Promise.resolve({
          params,
          segment,
          view: result,
          resolve: createViewResolver(view.routes),
        });
      }
    } else {
      return Promise.resolve({
        params,
        segment,
        view,
      });
    }
  }
}

export function isViewComponent<T>(view: View<T>): view is ViewComponent<T> {
  return view && view["render"] instanceof Function;
}

type CacheEntry<T> = {
  fullPath: Path;
  appliedPath: Path;
  view: T;
  resolve(path: Path): PromiseLike<ViewResolution<T>>;
};

type PathEntry<T> = {
  fullPath: Path;
  appliedPath: Path;
  remainingPath: Path;
  level: number;
  view: T;
  resolve(path: Path): PromiseLike<ViewResolution<T>>;
};

export function createRouter<T>(routes: Route<T>[]) {
  const subject = new Rx.ReplaySubject<Path>();
  const cache: CacheEntry<T>[] = [];

  const rootResolve = useCache(createViewResolver(routes));

  const entries: Rx.Observable<T> = subject.pipe(
    Ro.map((remainingPath) => ({
      level: 0,
      fullPath: [],
      remainingPath,
      resolve: rootResolve,
    })),
    Ro.expand(resolveChild),
    Ro.map((entry: PathEntry<T>) => {
      cache[entry.level] = {
        fullPath: entry.fullPath,
        appliedPath: entry.appliedPath,
        view: entry.view,
        resolve: entry.resolve,
      };
      return entry.view;
    })
  );

  function resolveChild(entry: PathEntry<T>) {
    if (!entry || !(entry.resolve instanceof Function)) return Rx.EMPTY;
    const resolutionPromise = entry.resolve(entry.remainingPath);
    if (!resolutionPromise) Rx.EMPTY;

    return Rx.from(resolutionPromise).pipe(
      Ro.mergeMap((resolution) => {
        if ("view" in resolution) {
          const appliedPath = resolution.segment;
          const remainingPath = entry.remainingPath.slice(appliedPath.length);
          const fullPath = [...entry.fullPath, ...appliedPath];
          const view = resolution.view;
          if (isPromiseLike(view))
            return Rx.from(view).pipe(
              Ro.map(
                (x) =>
                  ({
                    level: entry.level + 1,
                    fullPath,
                    appliedPath,
                    remainingPath,
                    view: x,
                    resolve: resolution.resolve,
                  } as PathEntry<T>)
              )
            );
          else
            return Rx.of({
              level: entry.level + 1,
              fullPath,
              appliedPath,
              remainingPath,
              view: resolution.view,
              resolve: resolution.resolve,
            });
        } else {
          return Rx.EMPTY;
        }
      })
    );
  }

  return {
    nav(path: Path) {
      subject.next(path);
    },
    subscribe: entries.subscribe.bind(entries),
  };
}

function useCache<T>(resolve: ViewResolver<T>): ViewResolver<T> {
  let next: ViewResolved<T> | null = null;
  return async (path) => {
    if (next && arrayStartsWith(path, next.segment)) {
      return next;
    }
    const resolution = await resolve(path);
    if ("resolve" in resolution && resolution.resolve instanceof Function) {
      return (next = {
        ...resolution,
        resolve: useCache(resolution.resolve),
      });
    } else if ('view' in resolution) {
      return next = resolution;
    } else {
      // not found
      console.warn('path not found', path.join('/'))
      return resolution;
    }
  };
}

function arrayStartsWith<T>(arr: T[], segment: T[]) {
  if (arr.length < segment.length) return false;
  for (let i = 0; i < segment.length; i++) {
    if (arr[i] !== segment[i]) return false;
  }

  return true;
}
