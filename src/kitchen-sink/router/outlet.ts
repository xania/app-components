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
        switch (routeResolution.type) {
          case RouteResolutionType.Append:
            {
              const { index } = routeResolution;
              for (let i = index; i < views.length; i++) {
                views[i].dispose();
              }
              views.length = index + 1;
              views[index] = outlet.renderView(routeResolution.view, target);
            }
            break;
          case RouteResolutionType.Dispose:
            const { index } = routeResolution;
            if (index < views.length) {
              views[index].dispose();
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
