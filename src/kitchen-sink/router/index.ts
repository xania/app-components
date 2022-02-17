import * as Rx from "rxjs";
import * as Ro from "rxjs/operators";
import { pathMatcher } from "@xania/router/lib/route/path-matcher";
import {
  RouteResolutionType,
  RouteResolver,
  RouteResolution,
  Path,
  RouteAppendResolution,
  RouteContext,
} from "./route-resolution";

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

function createRouteResolver<T>(routes: Route<T>[]): RouteResolver<T> {
  if (!routes) return null;
  let nextPromise: PromiseLike<RouteResolution<T>> = Promise.resolve(null);
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
      return null;
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

export function createRouter<T>(routes: Route<T>[]) {
  const subject = new Rx.ReplaySubject<Path>();

  const rootResolve = createRouteResolver(routes);

  const entries: Rx.Observable<RouteResolution<T>> = subject.pipe(
    Ro.switchMap((remainingPath) => rootResolve(remainingPath, 0)),
    Ro.expand((rr) =>
      "resolve" in rr && rr.resolve instanceof Function
        ? rr.resolve(rr.remainingPath, rr.index + 1)
        : Rx.EMPTY
    )
  );

  return {
    nav(path: Path) {
      subject.next(path);
    },
    subscribe: entries.subscribe.bind(entries),
  } as {
    nav: (path: Path) => void;
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
  routes?: Route<T>[];
}
