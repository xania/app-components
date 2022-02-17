import { jsx } from "@xania/view";
import { createRouter, RouteInput } from "./router";
import { Outlet } from "./router/outlet";
import { RouteContext } from "./router/route-resolution";

class MyComponent {
  render() {
    return Promise.resolve("component route");
  }
}

function MyFunction() {
  return "fun route";
}

const routes: RouteInput<string>[] = [
  { path: "start", view: "start route" },
  { path: "module", view: import("./module").then((e) => e.MyModule) },
  { path: "simple", view: "route a" },
  { path: "fun", view: MyFunction },
  { path: "comp", view: MyComponent },
  { path: "promise", view: Promise.resolve("promise route") },
];

export function Routing(routeContext: RouteContext) {
  const router = createRouter(routes, routeContext.url.path);
  router.nav(location.pathname.split("/").filter((e) => !!e));

  const outlet = new Outlet<string>(router, (element, target) => {
    const div = document.createElement("div", {});
    div.textContent = element;
    target.appendChild(div);

    return {
      dispose() {
        div.remove();
      },
    };
  });

  return (
    <div>
      <div>
        <button click={(_) => router.nav(["routing", "simple"])}>simple</button>
        <button click={(_) => router.nav(["routing", "module"])}>module</button>
        <button click={(_) => router.nav(["routing", "module", "child"])}>
          module child
        </button>
        <button click={(_) => router.nav(["routing", "fun"])}>fun</button>
        <button click={(_) => router.nav(["routing", "comp"])}>
          component
        </button>
        <button click={(_) => router.nav(["routing", "promise"])}>
          promise
        </button>
        <button click={(_) => router.nav([])}>empty</button>
      </div>
      {outlet}
    </div>
  );
}
