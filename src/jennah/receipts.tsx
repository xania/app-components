import { ContainerClient } from "@azure/storage-blob";
import { jsx, State } from "@xania/view";

export function Receipts() {
  var client = new ContainerClient(
    "https://appcomponents.blob.core.windows.net/xania"
  );
  const blobs = client.listBlobsByHierarchy("/");
  var blobName = new State<string | null>(null);
  var imageUrl = new State<string | null>(null);
  moveNext();

  return (
    <div>
      <h1>[{blobName}]</h1>
      <img src={imageUrl}></img>
      <button click={moveNext}>next</button>
      <button click={deleteBlob}>delete</button>
      <button click={approveBlob}>approve</button>
    </div>
  );

  async function deleteBlob() {
    const blobToDelete = blobName.current;
    await moveNext();
    await fetch("/api/blob/" + blobToDelete, {
      method: "DELETE",
    });
  }

  async function approveBlob() {
    const blobToDelete = blobName.current;
    await moveNext();
    await fetch("/api/blob/" + blobToDelete + "/approve", {
      method: "PUT",
    });
  }

  async function moveNext() {
    const { value, done } = await blobs.next();
    if (value?.kind === "blob") {
      blobName.set(value.name);
      imageUrl.set(client.url + "/" + value.name);
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
