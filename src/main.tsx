import { jsx, render, CssModule } from "@xania/view";
// import CreatePortlet from "./portlets/create-portlet";
import { WebApp, fallback } from "@xania/router";
import { route } from "@xania/router";
import { Receipts } from "./jennah/receipts";
import style from "./style.module.scss";
import { Benchmark } from "./kitchen-sink/benchmark";
import { RendererDemo } from "./kitchen-sink/renderer";
import { Routing } from "./kitchen-sink/routing";

<WebApp
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
/>;
