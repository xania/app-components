import { createRouter } from ".";
import { RouteInput, Router } from "./types";
import * as Rx from "rxjs";
import * as Ro from "rxjs/operators";
import { Path } from "./route-resolution";

export function createWebRouter<T>(routes: RouteInput<T>[]): Router<T> {
  const router = createRouter<T>(routes);

  return {
    next(path) {
      const url = Array.isArray(path) ? path.join("/") : path;
      if (location.pathname !== "/" + url) {
        console.log("push state", url);
        window.history.pushState(null, "", url);
      }
    },
    subscribe(observer) {
      console.log("subscribe");
      const webSubsc = webRoutes().subscribe(router);
      const routerSubsc = router.subscribe(observer);
      const subscr = new Rx.Subscription();
      subscr.add(webSubsc);
      subscr.add(routerSubsc);

      return subscr;
    },
  } as Router<T>;
}

function webRoutes(): Rx.Observable<Path> {
  return Rx.timer(0, 50).pipe(
    Ro.map(() => location.pathname),
    Ro.distinctUntilChanged(),
    Ro.map((pathname: string) => pathname.split("/").filter((x) => !!x))
  );
}
