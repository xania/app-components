import { RouteContext } from "./types";

export enum RouteResolutionType {
  Found,
  Replace,
  End,
  Unchanged,
}

export interface RouteFoundResolution<T> {
  type: RouteResolutionType.Found;
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

export interface RouteEndResolution {
  type: RouteResolutionType.End;
  remainingPath: Path;
  index: number;
}

export type Path = string[];

export type RouteResolver<T> = (
  path: Path,
  index: number
) => PromiseLike<RouteResolution<T>>;

export type RouteResolution<T> =
  | RouteFoundResolution<T>
  | RouteEndResolution
  | RouteUnchangedResolution<T>;
