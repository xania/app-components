import { jsx } from "@xania/view";
import { createRouter, RouteInput } from "./router";
import { Outlet } from "./router/outlet";

class MyComponent {
  render() {
    return Promise.resolve("component route");
  }
}

function MyFunction() {
  return "fun route";
}

const routes: RouteInput<string>[] = [
  { path: "start/test", view: "start route" },
  { path: "module", view: import("./module").then((e) => e.MyModule) },
  { path: "simple", view: "route a" },
  { path: "fun", view: MyFunction },
  { path: "comp", view: MyComponent },
  { path: "promise", view: Promise.resolve("promise route") },
];

export function Routing() {
  const router = createRouter(routes);
  router.nav(["start"]);

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
        <button click={(_) => router.nav(["simple"])}>simple</button>
        <button click={(_) => router.nav(["module"])}>module</button>
        <button click={(_) => router.nav(["module", "child"])}>
          module child
        </button>
        <button click={(_) => router.nav(["fun"])}>fun</button>
        <button click={(_) => router.nav(["comp"])}>component</button>
        <button click={(_) => router.nav(["promise"])}>promise</button>
      </div>
      {outlet}
    </div>
  );
}
