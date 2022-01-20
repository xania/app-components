import "./style.css";
import { jsx, render } from "@xania/view";

const app = document.querySelector<HTMLDivElement>("#app")!;
render(app, <HelloComponent />);

function HelloComponent() {
  return <div style="color: red; font-size: 28px;">hello world</div>;
}
