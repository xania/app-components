import "./style.css";
import { jsx, render } from "@xania/view";
import CreatePortlet from "./portlets/create-portlets";

const app = document.querySelector<HTMLDivElement>("#app")!;
render(app, <HelloComponent />);

function HelloComponent() {
  return (
    <div>
      Hello world!
      <CreatePortlet />
    </div>
  );
}
