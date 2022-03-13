import { jsx } from "@xania/view";
import { Outlet } from "./router/outlet";
import { RouteContext, ViewComponent } from "./router/types";

class MyComponent {
  render() {
    return Promise.resolve("component route");
  }
}

function MyFunction() {
  return "fun route";
}

export class Routing implements ViewComponent {
  constructor(private context: RouteContext) {}

  render() {
    const { context } = this;
    const router = context.childRouter([
      { path: "start", view: "start route" },
      { path: "module", view: import("./module").then((e) => e.MyModule) },
      { path: "simple", view: "route a" },
      { path: "fun", view: MyFunction },
      { path: "comp", view: MyComponent },
      { path: "promise", view: Promise.resolve("promise route") },
      { path: "params/:id", view: (ctx) => `[ ${ctx.params.id} ]` },
    ]);

    const outlet = new Outlet<string>(router, (element, target) => {
      const div = document.createElement("div");
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
          <button click={(_) => router.next("simple")}>simple</button>
          <button click={(_) => router.next("module")}>module</button>
          <button click={(_) => router.next("module/child")}>
            module child
          </button>
          <button click={(_) => router.next("fun")}>fun</button>
          <button click={(_) => router.next("comp")}>component</button>
          <button click={(_) => router.next("promise")}>promise</button>
          <button click={(_) => router.next("params/123")}>params</button>
          <button click={(_) => router.next([])}>empty</button>
        </div>
        {outlet}
      </div>
    );
  }
}
