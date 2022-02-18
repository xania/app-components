import { RouteContext } from "./types";

export enum RouteResolutionType {
  Append,
  Replace,
  Dispose,
  Unchanged,
}

export interface RouteAppendResolution<T> {
  type: RouteResolutionType.Append;
  view: T;
  context: RouteContext<T>;
  resolve?: RouteResolver<T>;
  remainingPath: Path;
  index: number;
}

export interface RouteUnchangedResolution<T> {
  type: RouteResolutionType.Unchanged;
  context: RouteContext<T>;
  remainingPath: Path;
  index: number;
}

export interface RouterDisposeResolution {
  type: RouteResolutionType.Dispose;
  index: number;
}

export type Path = string[];

export type RouteResolver<T> = (
  path: Path,
  index: number
) => PromiseLike<RouteResolution<T>>;

export type RouteResolution<T> =
  | RouteAppendResolution<T>
  | RouterDisposeResolution
  | RouteUnchangedResolution<T>;
