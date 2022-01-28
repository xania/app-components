import { ContainerClient } from "@azure/storage-blob";
import { createContainer, useContext, ViewContainer } from "@xania/view";
import { jsx } from "@xania/view";

export function ListDirectories() {
  var client = new ContainerClient(
    "https://appcomponents.blob.core.windows.net/xania"
  );

  var container = createContainer();
  var result = client.listBlobsByHierarchy("/", {});
  iterate(container, result);
  const $ = useContext<any>();
  return (
    <div>
      {container.map(
        <div>
          <span>-/</span>
          {$("name")}
        </div>
      )}
    </div>
  );
}

function iterate(c: ViewContainer, asyncIterator: { next(): any }) {
  asyncIterator.next().then((e) => {
    const value = e.value;
    if (value?.kind === "prefix") {
      c.push([value]);
    }
    if (!e.done) {
      iterate(c, asyncIterator);
    }
  });
}
