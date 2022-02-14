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
}

export interface RouteUnchangedResolution {
  type: RouteResolutionType.Unchanged;
  context: RouteContext;
}

export interface RouterDisposeResolution {
  type: RouteResolutionType.Dispose;
  index: number;
}

export type Path = string[];

export interface RouteContext {
  path: Path;
  params: router.RouteParams;
  remainingPath: Path;
  index: number;
}

export type RouteResolver<T> = (
  path: Path,
  index: number
) => PromiseLike<RouteResolution<T>>;

export type RouteResolution<T> =
  | RouteAppendResolution<T>
  | RouterDisposeResolution
  | RouteUnchangedResolution;
