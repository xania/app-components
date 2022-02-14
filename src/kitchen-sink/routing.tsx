import { jsx, RenderTarget } from "@xania/view";
import { createRouter, Route, route } from "./router";
import { RouteResolutionType } from "./router/route-resolution";

class MyComponent {
  render() {
    return Promise.resolve("component route");
  }
}

function MyFunction() {
  return "fun route";
}

const routes: Route<string>[] = [
  route<string>(["start"], "start route"),
  route<string>(
    ["module"],
    import("./module").then((e) => e.MyModule)
  ),
  route<string>(["simple"], "route-a"),
  route<string>(["fun"], MyFunction),
  route<string>(["comp"], MyComponent),
  route<string>(["promise"], Promise.resolve("promise route")),
];

export function Routing() {
  const app = createRouter(routes);
  app.nav(["start"]);

  class Outlet {
    render(target: RenderTarget) {
      const views: HTMLDivElement[] = [];
      const subscr = app.subscribe({
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

  return (
    <div>
      <div>
        <button click={(_) => app.nav(["simple"])}>simple</button>
        <button click={(_) => app.nav(["module"])}>module</button>
        <button click={(_) => app.nav(["module", "child"])}>
          module child
        </button>
        <button click={(_) => app.nav(["fun"])}>fun</button>
        <button click={(_) => app.nav(["comp"])}>component</button>
        <button click={(_) => app.nav(["promise"])}>promise</button>
      </div>
      <Outlet />
    </div>
  );
}
