import { RenderTarget } from "@xania/view";
import { Subscribable } from "rxjs";
import { RouteResolution, RouteResolutionType } from "./route-resolution";

interface Disposable {
  dispose(): void;
}
export class Outlet<T> {
  constructor(
    private router: Subscribable<RouteResolution<T>>,
    private renderView: (template: T, target: RenderTarget) => Disposable
  ) {}
  render(target: RenderTarget) {
    const views: Disposable[] = [];
    const outlet = this;
    const subscr = this.router.subscribe({
      next(routeResolution) {
        const routeIndex = routeResolution.index;
        switch (routeResolution.type) {
          case RouteResolutionType.Found:
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
          case RouteResolutionType.End:
            for (let i = routeIndex; i < views.length; i++) {
              views[i].dispose();
            }
            views.length = routeIndex;
            console.log(routeResolution.remainingPath);
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
