import { NextObserver } from "rxjs";
import { Path, RouteResolution } from "./route-resolution";

export interface Router<T> {
  next(path: string | Path): void;
  subscribe(observer: NextObserver<RouteResolution<T>>);
}

export type RouteInput<T> = Route<T> | RouteDescriptor<T> | RouteTuple<T>;

export interface Route<T> {
  match(path: string[]): PathMatchResult;
  view: View<T> | PromiseLike<View<T>>;
}

interface PathMatchResult {
  segment: router.Path;
  params?: router.RouteParams;
}
type ViewFn<T> = (routeContext: RouteContext<T>) => T | PromiseLike<T>;
export interface ViewComponent<T = JSX.Element> {
  render(): T | PromiseLike<T>;
  routes?: RouteInput<T>[];
}
interface ViewConstructor<T> {
  new (context: RouteContext<T>): ViewComponent<T>;
}

export type View<T> = T | ViewComponent<T> | ViewConstructor<T> | ViewFn<T>;

export interface RouteContext<T = JSX.Element> {
  path: Path;
  params: router.RouteParams;
  childRouter(routes: RouteInput<T>[]): Router<T>;
}

type RouteTuple<T> = [path: PathInput, view: View<T>];

export interface RouteDescriptor<T> {
  path: PathInput;
  view: View<T> | PromiseLike<View<T>>;
}

type PathInput = string | Path | PathMatcher;

export type PathMatcher = (path: router.Path) => PathMatchResult | null;
