import { ContainerClient } from "@azure/storage-blob";
import { jsx, State } from "@xania/view";

export function Receipts() {
  var client = new ContainerClient(
    "https://appcomponents.blob.core.windows.net/xania"
  );
  const blobs = client.listBlobsByHierarchy("/");
  var image = new State<string | null>(null);
  moveNext();

  return (
    <div>
      <h1>[{image}]</h1>
      <img src={image}></img>
      <button click={moveNext}>next</button>
    </div>
  );

  async function moveNext() {
    const { value, done } = await blobs.next();
    if (value?.kind === "blob") {
      image.set(client.url + "/" + value.name);
    } else if (!done) {
      return moveNext();
    }
  }
}

// function listBlobsByHierarchy() {
//   return new Rx.Observable((subscriber) => {
//     iter();
//     async function iter() {
//       const next = await a.next();
//       const value = next.value;
//       if (value?.kind === "blob") {
//         subscriber.next(value);
//       }

//       if (!next.done) {
//         iter();
//       }
//     }
//   });
// }
