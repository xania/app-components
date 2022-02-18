import { createRouter } from ".";
import { RouteInput, Router } from "./types";

export function createWebRouter<T>(routes: RouteInput<T>[]): Router<T> {
  const router = createRouter<T>(routes);

  return {
    next(path) {
      router.next(path);

      const url = Array.isArray(path) ? path.join("/") : path;
      window.history.pushState(null, null, url);
    },
    subscribe(observer) {
      return router.subscribe(observer);
    },
  } as Router<T>;
}
