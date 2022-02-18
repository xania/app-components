import { anyPath } from "./router";
import { RouteContext, RouteInput, ViewComponent } from "./router/types";

export class MyModule implements ViewComponent<any> {
  render() {
    return "module route";
  }

  routes: RouteInput<any>[] = [
    { path: "child", view: "module child route" },
    [anyPath, (context: RouteContext) => context.path.join(",")],
  ];
}
