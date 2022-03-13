import * as Rx from "rxjs";
import * as Ro from "rxjs/operators";
import {
  RouteResolutionType,
  RouteResolver,
  RouteResolution,
  Path,
  RouteEndResolution,
} from "./route-resolution";
import { PathTemplate } from "./path-template";
import { pathMatcher } from "./path-matcher";
import {
  PathMatcher,
  Route,
  RouteContext,
  RouteDescriptor,
  RouteInput,
  Router,
  View,
  ViewComponent,
} from "./types";
import { NextObserver } from "rxjs";

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

export function isPromiseLike<T>(
  x: View<T> | PromiseLike<View<T>>
): x is PromiseLike<View<T>> {
  return x && x["then"] instanceof Function;
}

function createRouteResolver<T>(
  routeInputs: RouteInput<T>[],
  router: Router<T>
): RouteResolver<T> {
  if (!routeInputs) return null;

  let nextPromise: PromiseLike<RouteResolution<T>> = Promise.resolve(null);
  const routes = routeInputs.map((x) => compileRoute(x));

  return (path: Path, index?: number): PromiseLike<RouteResolution<T>> => {
    return (nextPromise = nextPromise.then((next) => {
      if (
        next &&
        next.type === RouteResolutionType.Found &&
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
          const routeContext: RouteContext<T> = {
            params,
            path: segment,
            childRouter(routes) {
              const child = createRouter(routes);
              child.next(remainingPath);
              return child;
            },
          };
          const remainingPath = path.slice(segment.length);
          return asRouteView<T>(view, routeContext).then((routeView) => {
            return {
              view: routeView.view,
              resolve: createRouteResolver(routeView.routes, router),
              context: routeContext,
              remainingPath,
              index,
              type: RouteResolutionType.Found,
            };
          });
        }
      }

      return routeEnd(path, index);
    }));
  };

  function asRouteView<T>(
    view: View<T> | PromiseLike<View<T>>,
    routeContext: RouteContext<T>
  ): PromiseLike<RouteView<T>> {
    if (isPromiseLike(view)) {
      return view.then((x) => asRouteView(x, routeContext));
    } else if (view instanceof Function) {
      try {
        return Promise.resolve({
          view: view.apply(null, [routeContext]),
        } as RouteView<T>);
      } catch {
        const component = Reflect.construct(view, [routeContext]);
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

export function createRouter<T>(routes: RouteInput<T>[]) {
  const subject = new Rx.ReplaySubject<Path>();

  return {
    next(path: string | Path) {
      console.log("next path", path);
      if (Array.isArray(path)) subject.next(path);
      else subject.next(path.split("/").filter((e) => !!e));
    },

    subscribe(observer: NextObserver<RouteResolution<T>>) {
      const rootResolve = createRouteResolver(routes, this);

      const entries: Rx.Observable<RouteResolution<T>> = subject.pipe(
        Ro.tap((e) => console.log("entry", e)),
        Ro.mergeMap((remainingPath) => rootResolve(remainingPath, 0)),
        Ro.filter((rr) => !!rr),
        Ro.expand((prev) => {
          console.log("expand", prev);
          if (prev.type === RouteResolutionType.Found) {
            const { remainingPath } = prev;
            if (remainingPath.length === 0)
              return Rx.of(routeEnd([], prev.index + 1));
            if (prev && "resolve" in prev && prev.resolve instanceof Function)
              return prev.resolve(prev.remainingPath, prev.index + 1);
            return Rx.of(routeEnd(remainingPath, prev.index + 1));
          }

          return Rx.EMPTY;
        })
      );
      return entries.subscribe(observer);
    },
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

function isRouteDescriptor<T>(
  routeInput: RouteInput<T>
): routeInput is RouteDescriptor<T> {
  return routeInput && "path" in routeInput;
}

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
    match: anyRoute,
    view,
  };
}

export const anyRoute = (path: router.Path) => ({ segment: path });
export const anyPath = (path: router.Path) => ({ segment: path });

function routeEnd(remainingPath: Path, index: number): RouteEndResolution {
  return {
    type: RouteResolutionType.End,
    remainingPath,
    index,
  };
}
