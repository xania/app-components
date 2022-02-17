import { UrlHelper } from "./url-helper";

export enum RouteResolutionType {
  Append,
  Replace,
  Dispose,
  Unchanged,
}

export interface RouteAppendResolution<T> {
  type: RouteResolutionType.Append;
  view: T;
  context: RouteContext;
  resolve?: RouteResolver<T>;
  remainingPath: Path;
  index: number;
}

export interface RouteUnchangedResolution {
  type: RouteResolutionType.Unchanged;
  context: RouteContext;
  remainingPath: Path;
  index: number;
}

export interface RouterDisposeResolution {
  type: RouteResolutionType.Dispose;
  index: number;
}

export type Path = string[];

export interface RouteContext {
  url: UrlHelper;
  params: router.RouteParams;
}

export type RouteResolver<T> = (
  path: Path,
  index: number
) => PromiseLike<RouteResolution<T>>;

export type RouteResolution<T> =
  | RouteAppendResolution<T>
  | RouterDisposeResolution
  | RouteUnchangedResolution;
