import "./style.css";
import { jsx, render } from "@xania/view";
// import CreatePortlet from "./portlets/create-portlet";
import { CameraComponent } from "./jennah/camera";
import { BrowserOutlet } from "@xania/router";
import { route } from "@xania/router";
import { ListDirectories } from "./storage";

const outlet = render(
  <BrowserOutlet
    routes={[route("test", <Test />), route("camera", <CameraComponent />)]}
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
