import { ContainerClient } from "@azure/storage-blob";
import { jsx, State } from "@xania/view";
import "./receipts.scss";

export function Receipts() {
  var client = new ContainerClient(
    "https://appcomponents.blob.core.windows.net/xania"
  );
  const blobs = client.listBlobsByHierarchy("/");
  var blobName = new State<string | null>(null);
  var imageUrl = new State<string | null>(null);
  moveNext();

  return (
    <div class="receipts-carousel">
      <img class="receipts-carousel__img" src={imageUrl}></img>
      <div class="receipts-carousel__toolbar">
        <button click={deleteBlob}>delete</button>
        <button click={(_) => moveBlob("approved")}>approve</button>
        <button click={(_) => moveBlob("paused")}>pause</button>
        <button click={moveNext}>next</button>
      </div>
    </div>
  );

  async function deleteBlob() {
    const blobToDelete = blobName.current;
    await moveNext();
    await fetch("/api/blob/" + blobToDelete, {
      method: "DELETE",
    });
  }

  async function moveBlob(target: string) {
    const blobToApprove = blobName.current;
    await moveNext();
    await fetch("/api/blob/" + blobToApprove + "/" + target, {
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
    } else {
      blobName.set(null);
      imageUrl.set(null);
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
