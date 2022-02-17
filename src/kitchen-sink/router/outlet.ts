import { RenderTarget } from "@xania/view";
import { NextObserver } from "rxjs";
import { RouteResolution, RouteResolutionType } from "./route-resolution";

interface Disposable {
  dispose(): void;
}
export class Outlet<T> {
  constructor(
    private navigator: Navigator<T>,
    private renderView: (template: T, target: RenderTarget) => Disposable
  ) {}
  render(target: RenderTarget) {
    const views: Disposable[] = [];
    const outlet = this;
    const subscr = this.navigator.subscribe({
      next(routeResolution) {
        const routeIndex = routeResolution.index;
        switch (routeResolution.type) {
          case RouteResolutionType.Append:
            {
              for (let i = routeIndex; i < views.length; i++) {
                views[i].dispose();
              }
              views.length = routeIndex + 1;
              views[routeIndex] = outlet.renderView(
                routeResolution.view,
                target
              );
            }
            break;
          case RouteResolutionType.Dispose:
            for (let i = routeIndex; i < views.length; i++) {
              views[i].dispose();
            }
            views.length = routeIndex;
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