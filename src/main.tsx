import { jsx, render } from "@xania/view";
// import CreatePortlet from "./portlets/create-portlet";
import { CameraComponent } from "./jennah/camera";
import { WebApp, fallback } from "@xania/router";
import { route } from "@xania/router";
import { Receipts } from "./jennah/receipts";
import { RouteContext } from "@xania/router";
import styles from "./style.module.css";

class Test {
  constructor(private ctx: RouteContext) {}
  get view(): any {
    return <div>[test de test] {this.ctx.path.join("-")}</div>;
  }
}

<WebApp
  render={render}
  routes={[
    route("test/asdafs/asfdasd", (ctx) => new Test(ctx)),
    route("camera", CameraComponent),
    route("receipts", Receipts),
    fallback((context) => (
      <div class={styles["section"]}>
        <div style="color: gray; font-size: 100px;">404</div>
        <div style="color: white">/{context.url.path.join("/")}</div>
      </div>
    )),
  ]}
/>;
