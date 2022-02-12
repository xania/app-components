import { route } from "./router";

export class MyModule {
  render() {
    return "module route";
  }
  routes = [route(["child"], "module child route")];
}
