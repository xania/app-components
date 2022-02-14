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
  let next: RouteAppendResolution<T> | null = null;
  return (path: Path, index?: number): PromiseLike<RouteResolution<T>> => {
    if (path.length === 0) {
      next = null;
      return Promise.resolve({
        type: RouteResolutionType.Dispose,
        index,
      });
    }
    if (
      next &&
      next.context.path.length > 0 &&
      arrayStartsWith(path, next.context.path)
    ) {
      return Promise.resolve({
        context: {
          ...next.context,
          remainingPath: path.slice(next.context.path.length),
        },
        resolve: next.resolve,
        type: RouteResolutionType.Unchanged,
      });
    }

    for (const route of routes) {
      const matchResult = route.match(path);
      if (matchResult) {
        const { segment, params } = matchResult;
        const { view } = route;
        const context: RouteContext = {
          params,
          path: segment,
          remainingPath: path.slice(segment.length),
          index,
        };
        const resolution = isPromiseLike(view)
          ? view.then((x) => asRouteResolution(x, context))
          : asRouteResolution(view, context);
        return resolution.then((r) => (next = r));
      }
    }

    return Promise.resolve((next = null));
  };

  function asRouteResolution<T>(
    view: View<T>,
    context: RouteContext
  ): PromiseLike<RouteAppendResolution<T>> {
    if (view instanceof Function) {
      try {
        return asRouteResolution((view as any)(), context);
      } catch {
        const component = Reflect.construct(
          view as any,
          []
        ) as ViewComponent<T>;
        return asRouteResolution(component, context);
      }
    } else if (isViewComponent(view)) {
      const result = view.render();
      if (isPromiseLike(result)) {
        return result.then((x) => ({
          context,
          view: x,
          resolve: createRouteResolver(view.routes),
          type: RouteResolutionType.Append,
        }));
      } else {
        return Promise.resolve({
          context,
          view: result,
          resolve: createRouteResolver(view.routes),
          type: RouteResolutionType.Append,
        });
      }
    } else {
      return Promise.resolve({
        context,
        view,
        type: RouteResolutionType.Append,
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
        ? rr.resolve(rr.context.remainingPath, rr.context.index + 1)
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
