import { jsx, RenderTarget } from "@xania/view";
import { createRouter, Route, route } from "./router";
import { Outlet } from "./router/outlet";
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

  const outlet = new Outlet<string>(app);

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
      {outlet}
    </div>
  );
}
