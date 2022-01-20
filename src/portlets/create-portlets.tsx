import { jsx, Renderable } from "@xania/view";
export default function CreatePortlet() {
  return (
    <div style="border: 1px solid red; padding: 10px; margin: 20px;">
      <header>New Portlet</header>
      {renderable}
    </div>
  );
}

const renderable: Renderable = {
  render(target, context) {
    console.log(target, context);
  },
};
