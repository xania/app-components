import { CssModule, jsx, render } from "@xania/view";
import { CameraComponent } from "./jennah/camera";
import { Receipts } from "./jennah/receipts";
import { Benchmark } from "./kitchen-sink/benchmark";
import { RendererDemo } from "./kitchen-sink/renderer";
// import { jsx, render, CssModule } from "@xania/view";
// import CreatePortlet from "./portlets/create-portlet";
// import { WebApp, fallback } from "@xania/router";
// import { route } from "@xania/router";
// import { Receipts } from "./jennah/receipts";
import style from "./style.module.scss";
// import { Benchmark } from "./kitchen-sink/benchmark";
// import { RendererDemo } from "./kitchen-sink/renderer";
// import { Routing } from "./kitchen-sink/routing";
import { createRouter, fallback } from "./kitchen-sink/router";
import { Outlet } from "./kitchen-sink/router/outlet";
import { Routing } from "./kitchen-sink/routing";

{
  /* <WebApp
  render={render}
  routes={[
    route("benchmark", (ctx) => new Benchmark(ctx)),
    route("renderer", RendererDemo),
    route("camera", (_) =>
      import("./jennah/camera").then((m) => m.CameraComponent)
    ),
    route("receipts", Receipts),
    route("routing", Routing),
    fallback((context) => (
      <CssModule classes={style}>
        <div class="section">
          <div style="color: gray; font-size: 100px;">404</div>
          <div style="color: white">/{context.url.path.join("/")}</div>
        </div>
      </CssModule>
    )),
  ]}
/>; */
}

const router = createRouter([
  ["benchmark", Benchmark],
  ["renderer", RendererDemo],
  ["routing", Routing],
  ["camera", CameraComponent],
  ["receipts", Receipts],
  fallback((context) => (
    <CssModule classes={style}>
      <div class="section">
        <div style="color: gray; font-size: 100px;">404</div>
        <div style="color: white">/{context.path.join("/")}</div>
      </div>
    </CssModule>
  )),
]);
router.next(location.pathname);

render(<App />, document.body);

function App() {
  const outlet = new Outlet(router, (element, target) => {
    const result = render(element, target);
    return {
      dispose() {
        for (const r of result) {
          r.remove();
        }
      },
    };
  });
  return outlet;
}
