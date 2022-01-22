import { jsx } from "@xania/view";
import { DropZone } from "../drop-zone";

interface PortletProps {
  title: string;
}

export default function CreatePortlet(props: PortletProps) {
  return (
    <div>
      <header>{props.title}</header>
      <DropZone callback={uploadFiles} />
      <form>
        <input
          type="file"
          accept="image/*"
          capture="camera"
          change={(e) => uploadFiles(e.event.target["files"], "uploads")}
        />
      </form>
    </div>
  );

  async function uploadFiles(files: FileList, dir?: string) {
    var formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.set(file.name, file, dir ? dir + "/" + file.name : file.name);
    }
    const url = "/api/CreateComponentTrigger";
    return await fetch(url, {
      body: formData,
      method: "POST",
    });
  }
}
