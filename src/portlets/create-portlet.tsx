import { jsx } from "@xania/view";
import { DropZone } from "../drop-zone";
import { uploadFiles } from "../storage/upload-files";

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
}
