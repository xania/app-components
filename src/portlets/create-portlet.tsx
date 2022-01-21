import { jsx } from "@xania/view";
import { DropZone } from "../drop-zone";

interface PortletProps {
  title: string;
}

export default function CreatePortlet(props: PortletProps) {
  return (
    <div>
      <header>{props.title}</header>
      <DropZone callback={console.log} />
    </div>
  );
}
