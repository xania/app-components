import * as Rx from "rxjs";
import * as Ro from "rxjs/operators";
import {
  RouteResolutionType,
  RouteResolver,
  RouteResolution,
  Path,
  RouteContext,
} from "./route-resolution";
import { PathTemplate } from "./path-template";
import { pathMatcher } from "./path-matcher";
export type PathMatcher = (path: router.Path) => PathMatchResult | null;

export function route<T>(
  path: string | PathMatcher | PathTemplate,
  view: View<T> | PromiseLike<View<T>>
): Route<T> {
  const matcher = pathMatcher(path);
  return {
    match: matcher,
    view,
  };
}

interface PathMatchResult {
  segment: router.Path;
  params: router.RouteParams;
}
export interface Route<T> {
  match(path: string[]): PathMatchResult;
  view: View<T> | PromiseLike<View<T>>;
}
type ViewFn<T> = () => T | PromiseLike<T>;
type ViewComponent<T> = {
  render(): T | PromiseLike<T>;
  routes?: RouteInput<T>[];
};
interface ViewConstructor<TView> {
  new (): ViewComponent<TView>;
}

type View<T> = T | ViewComponent<T> | ViewConstructor<T> | ViewFn<T>;

// type PathEntry<T> = {
//   remainingPath: Path;
//   resolution: RouteResolution<T> | null;
//   resolve: RouteResolver<T>;
// };

// type ViewResolution<T> = ViewResolved<T> | null;

/////////////////////////////////////////////////////////////////////

export function isPromiseLike<T>(
  x: View<T> | PromiseLike<View<T>>
): x is PromiseLike<View<T>> {
  return x && x["then"] instanceof Function;
}

function createRouteResolver<T>(
  routeInputs: RouteInput<T>[]
): RouteResolver<T> {
  if (!routeInputs) return null;

  let nextPromise: PromiseLike<RouteResolution<T>> = Promise.resolve(null);
  const routes = routeInputs.map((x) => compileRoute(x));

  return (path: Path, index?: number): PromiseLike<RouteResolution<T>> => {
    if (path.length === 0) {
      nextPromise = Promise.resolve(null);
      return Promise.resolve({
        type: RouteResolutionType.Dispose,
        index,
      });
    }
    return (nextPromise = nextPromise.then((next) => {
      if (
        next &&
        next.type === RouteResolutionType.Append &&
        next.context.path.length > 0 &&
        arrayStartsWith(path, next.context.path)
      ) {
        return {
          ...next,
          remainingPath: path.slice(next.context.path.length),
          type: RouteResolutionType.Unchanged,
        };
      }

      for (const route of routes) {
        const matchResult = route.match(path);
        if (matchResult) {
          const { segment, params } = matchResult;
          const { view } = route;
          const context: RouteContext = {
            params,
            path: segment,
          };
          const remainingPath = path.slice(segment.length);
          return asRouteView<T>(view).then((routeView) => {
            return {
              view: routeView.view,
              resolve: createRouteResolver(routeView.routes),
              context,
              remainingPath,
              index,
              type: RouteResolutionType.Append,
            };
          });
        }
      }

      return {
        type: RouteResolutionType.Dispose,
        index,
      };
    }));
  };

  function asRouteView<T>(
    view: View<T> | PromiseLike<View<T>>
  ): PromiseLike<RouteView<T>> {
    if (isPromiseLike(view)) {
      return view.then(asRouteView);
    } else if (view instanceof Function) {
      try {
        return Promise.resolve({
          view: view.apply(null, []),
        } as RouteView<T>);
      } catch {
        const component = Reflect.construct(view, []);
        return mapPromise(component.render(), (x) => ({
          view: x,
          routes: component.routes,
        }));
      }
    } else if (isViewComponent(view)) {
      return mapPromise(view.render(), (x) => ({
        view: x,
        routes: view.routes,
      }));
    } else {
      return Promise.resolve({
        view,
      });
    }
  }
}

export function isViewComponent<T>(view: View<T>): view is ViewComponent<T> {
  return view && view["render"] instanceof Function;
}

export function createRouter<T>(routes: RouteInput<T>[], basePath: Path = []) {
  const subject = new Rx.ReplaySubject<Path>();

  const rootResolve = createRouteResolver(routes);

  const entries: Rx.Observable<RouteResolution<T>> = subject.pipe(
    Ro.map((x) =>
      arrayStartsWith(x, basePath) ? x.slice(basePath.length) : []
    ),
    Ro.switchMap((remainingPath) => rootResolve(remainingPath, 0)),
    Ro.filter((rr) => !!rr),
    Ro.expand((rr) =>
      rr && "resolve" in rr && rr.resolve instanceof Function
        ? rr.resolve(rr.remainingPath, rr.index + 1)
        : Rx.EMPTY
    )
  );

  return {
    nav(path: string | Path) {
      if (Array.isArray(path)) subject.next(path);
      else subject.next(path.split("/").filter((e) => !!e));
    },
    subscribe: entries.subscribe.bind(entries),
  } as {
    nav: (path: string | Path) => void;
    subscribe: typeof entries.subscribe;
  };
}

function arrayStartsWith<T>(arr: T[], segment: T[]) {
  if (arr.length < segment.length) return false;
  for (let i = 0; i < segment.length; i++) {
    if (arr[i] !== segment[i]) return false;
  }

  return true;
}

function mapPromise<T, U>(x: T | PromiseLike<T>, map: (x: T) => U) {
  if (isPromiseLike(x)) {
    return x.then((e) => mapPromise(e, map));
  } else {
    return Promise.resolve(map(x));
  }
}

interface RouteView<T> {
  view: T;
  routes?: RouteInput<T>[];
}

type PathInput = string | Path;

interface RouteDescriptor<T> {
  path: PathInput;
  view: View<T> | PromiseLike<View<T>>;
}

function isRouteDescriptor<T>(
  routeInput: RouteInput<T>
): routeInput is RouteDescriptor<T> {
  return routeInput && "path" in routeInput;
}

type RouteTuple<T> = [path: PathInput, view: View<T>];

export type RouteInput<T> = Route<T> | RouteDescriptor<T> | RouteTuple<T>;

function compileRoute<T>(routeInput: RouteInput<T>): Route<T> {
  if (isRouteDescriptor(routeInput)) {
    const matcher = pathMatcher(routeInput.path);
    return {
      match: matcher,
      view: routeInput.view,
    };
  } else if (Array.isArray(routeInput)) {
    const matcher = pathMatcher(routeInput[0]);
    return {
      match: matcher,
      view: routeInput[1],
    };
  } else {
    return routeInput;
  }
}

export function fallback<TView>(view: Route<TView>["view"]): Route<TView> {
  return {
    match(path: router.Path) {
      return { segment: path, params: {} };
    },
    view,
  };
}
