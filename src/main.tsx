import "./style.css";
import { jsx, render } from "@xania/view";
import CreatePortlet from "./portlets/create-portlet";
import { CameraComponent } from "./camera";

render(<App />, "#app", { name: "Ibrahim" });

function App() {
  return (
    <section>
      <header class="top-bar">App Workspace</header>
      <section class="jumbotron">
        Select components for the your App with no code, we take care for
        everything else.
      </section>
      <CreatePortlet title="Hello Portlet" />
      <CameraComponent />
    </section>
  );
}
