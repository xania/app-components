import { RenderTarget } from "@xania/view";
import { NextObserver, Observer } from "rxjs";
import { RouteResolution, RouteResolutionType } from "./route-resolution";

export class Outlet<T> {
  constructor(private navigator: Navigator<T>) {}
  render(target: RenderTarget) {
    const views: HTMLDivElement[] = [];
    const subscr = this.navigator.subscribe({
      next(routeResolution) {
        switch (routeResolution.type) {
          case RouteResolutionType.Append:
            {
              const { index } = routeResolution.context;
              for (let i = index; i < views.length; i++) {
                views[i].remove();
              }
              views.length = index + 1;
              const div = document.createElement("div");
              target.appendChild(div);
              div.textContent = `[${routeResolution.context.index}] ${routeResolution.view}`;
              views[index] = div;
            }
            break;
          case RouteResolutionType.Dispose:
            const { index } = routeResolution;
            if (index < views.length) {
              views[index].remove();
            }
            break;
        }
      },
    });

    return {
      dispose() {
        subscr.unsubscribe();
      },
    };
  }
}

interface Navigator<T> {
  subscribe(observer: NextObserver<RouteResolution<T>>);
}
