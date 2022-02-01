import "./style.css";
import { jsx, render } from "@xania/view";
// import CreatePortlet from "./portlets/create-portlet";
import { CameraComponent } from "./jennah/camera";
import { BrowserOutlet, fallback } from "@xania/router";
import { route } from "@xania/router";
import { Receipts } from "./jennah/receipts";
import { RouteContext } from "@xania/router";

class Test {
  constructor(private ctx: RouteContext) {}
  get view(): any {
    return <div>[test de test] {this.ctx.path.join("-")}</div>;
  }
}

render(
  <BrowserOutlet
    render={render}
    routes={[
      route("test/asdafs/asfdasd", (ctx) => new Test(ctx)),
      route("camera", CameraComponent),
      route("receipts", Receipts),
      fallback((context) => (
        <div>
          <div style="color: gray; font-size: 40px;">404</div>
          <div>/{context.url.path.join("/")}</div>
        </div>
      )),
    ]}
  />,
  "#app"
);

// render(<CameraComponent />, "#app", { name: "Ibrahim" });

// function App() {
//   return (
//     <section>
//       <header class="top-bar">App Workspace</header>
//       <section class="jumbotron">
//         Select components for the your App with no code, we take care for
//         everything else.
//       </section>
//       <CreatePortlet title="Hello Portlet" />
//       <CameraComponent />
//     </section>
//   );
// }
