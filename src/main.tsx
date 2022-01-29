import "./style.css";
import { jsx, render } from "@xania/view";
// import CreatePortlet from "./portlets/create-portlet";
import { CameraComponent } from "./jennah/camera";
import { BrowserOutlet, anyRoute } from "@xania/router";
import { route } from "@xania/router";
import { ListDirectories } from "./services/storage";
import { Receipts } from "./jennah/receipts";

render(
  <BrowserOutlet
    routes={[
      route("test", <Test />),
      route("camera", <CameraComponent />),
      route("receipts", <Receipts />),
      anyRoute((context) => (
        <div>
          <div style="color: gray; font-size: 40px;">404</div>
          <div>/{context.url.path.join("/")}</div>
        </div>
      )),
    ]}
  />,
  "#app"
);

function Test() {
  return <ListDirectories></ListDirectories>;
}

// render(<CameraComponent />, "#app", { name: "Ibrahim" });

// function App() {
//   return (
//     <section>
//       <header class="top-bar">App Workspace</header>
//       <section class="jumbotron">
//         Select components for the your App with no code, we take care for
//         everything else.
//       </section>
//       <CreatePortlet title="Hello Portlet" />
//       <CameraComponent />
//     </section>
//   );
// }
