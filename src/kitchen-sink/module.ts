export class MyModule {
  render() {
    return "module route";
  }
  routes = [{ path: "child", view: "module child route" }];
}
