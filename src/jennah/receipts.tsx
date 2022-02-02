import { jsx, State, CssModule } from "@xania/view";
import style from "./receipts.module.scss";

export function Receipts() {
  const blobs = listBlobs();
  var blobName = new State<string | null>(null);
  var imageUrl = blobName.map((x) =>
    x ? "https://appcomponents.blob.core.windows.net/xania/" + x : null
  );
  moveNext();

  return (
    <CssModule classes={style}>
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
          <button click={moveNext}>next</button>
        </div>
      </div>
    </CssModule>
  );

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
    if (value) {
      blobName.set(value.blobName);
    } else if (!done) {
      return moveNext();
    } else {
      blobName.set(null);
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
