import { fallback } from "./router";

export class MyModule {
  render() {
    return "module route";
  }
  routes = [
    { path: "child", view: "module child route" },
    fallback<string>((context) => context.url.path.join(",")),
  ];
}
