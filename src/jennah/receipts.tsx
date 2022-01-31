import { jsx, State } from "@xania/view";
import "./receipts.scss";

export function Receipts() {
  // var containerClient = new ContainerClient(
  //   "https://appcomponents.blob.core.windows.net/" + containerName
  // );

  // var blobService = new BlobServiceClient(
  //   "DefaultEndpointsProtocol=https;AccountName=appcomponents;AccountKey=neO7Qt4WOs0fqF3TqrGBB1kgQw29cQ/dVa1gNqoLgrvBoAfDTmKrFcbAqFgtj8GmD1Iol4843gjZ8s+PM4Jj4w==;EndpointSuffix=core.windows.net"
  // );
  // var blobService = new BlobServiceClient("appcomponents");
  // const blobs = blobService.findBlobsByTags(
  //   `@container = '${containerName}' AND "company"='xania'`
  // );
  // const blobs = containerClient.listBlobsByHierarchy("/", {
  //   // includeTags: true,
  // });
  const blobs = listBlobs();
  var blobName = new State<string | null>(null);
  var imageUrl = new State<string | null>(null);
  moveNext();

  return (
    <div class="receipts-carousel">
      <img class="receipts-carousel__img" src={imageUrl}></img>
      <div class="receipts-carousel__toolbar">
        <button click={deleteBlob}>delete</button>
        <button
          click={(_) => updateBlob(blobName.current, { targetDir: "jennah" })}
        >
          jennah
        </button>
        <button
          click={(_) => updateBlob(blobName.current, { targetDir: "xania" })}
        >
          xania
        </button>
        <button click={close}>close</button>
        <button click={moveNext}>next</button>
      </div>
    </div>
  );

  async function close() {
    return updateBlob(blobName.current, {
      targetDir: "closed",
    });
  }

  async function deleteBlob() {
    const blobToDelete = blobName.current;
    await moveNext();
    await fetch("/api/blob/" + blobToDelete, {
      method: "DELETE",
    });
  }

  interface UpdateModel {
    tags?: { [s: string]: string };
    targetDir?: string;
  }
  async function updateBlob(blobName: string, model: UpdateModel) {
    await moveNext();
    await fetch("/api/blob/" + blobName, {
      method: "PUT",
      body: JSON.stringify(model),
    });
  }

  async function moveNext() {
    const { value, done } = await blobs.next();
    console.log({ value, done });
    if (value) {
      blobName.set(value.blobName);
      imageUrl.set(
        "https://appcomponents.blob.core.windows.net/xania/" + value.blobName
      );
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

type Blob = {
  blobName: string;
};

async function* listBlobs(): AsyncGenerator<Blob, void, Blob> {
  const arr: string[] = await fetch("/api/blob/uploads/", {
    method: "GET",
  }).then((e) => e.json());
  for (const blobName of arr) yield { blobName };
}
