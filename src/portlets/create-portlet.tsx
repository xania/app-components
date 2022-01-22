import { jsx } from "@xania/view";
import { DropZone } from "../drop-zone";

interface PortletProps {
  title: string;
}

export default function CreatePortlet(props: PortletProps) {
  return (
    <div>
      <header>{props.title}</header>
      <DropZone callback={onDropFiles} />
    </div>
  );

  async function onDropFiles(files: FileList) {
    var formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.set(file.name, file, file.name);
    }
    const url = "/api/CreateComponentTrigger";
    return await fetch(url, {
      body: formData,
      method: "POST",
    });
  }
}
