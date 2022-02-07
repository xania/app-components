import { pathMatcher } from "@xania/router/lib/route/path-matcher";
import { jsx } from "@xania/view";

export function Routing() {
  var router = new Router();
  router.goto(["module", "4576"]);

  return <div>routings</div>;
}

class Router {
  goto(path: Path) {
    for (const route of routes) {
      const matchResult = route.match(path);
      if (matchResult) {
        console.log(matchResult);
      }
    }
  }
}

type Path = string[];
interface PathMatchResult {
  segment: router.Path;
  params: router.RouteParams;
}
interface Route<T> {
  match(path: string[]): PathMatchResult;
  view: View<T> | PromiseLike<View<T>>;
}
type ViewFn<TView> = () => TView;
type ViewComponent<T> = { view: T | PromiseLike<T>; routes?: Route<T>[] };
interface ViewConstructor<TView> {
  new (): View<TView>;
}

type View<T> =
  | T
  | PromiseLike<View<T>>
  | ViewComponent<T>
  | ViewConstructor<T>
  | ViewFn<T>;

const module = Promise.resolve<View<number>>({
  view: 987,
  routes: [route(["4576"], 4576)],
});

function route<T>(path: Path, view: View<T> | PromiseLike<View<T>>): Route<T> {
  const matcher = pathMatcher(path);
  return {
    match: matcher,
    view,
  };
}

class MyComponent {
  view = Promise.resolve(76767);
}

function MyFunction() {
  return 345;
}

const routes: Route<number>[] = [
  route<number>(["module"], module),
  route<number>(["a"], 123),
  route<number>(["fun"], MyFunction),
  route<number>(["comp"], MyComponent),
];
