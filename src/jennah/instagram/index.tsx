import { jsx } from "@xania/view";
import { Camera, createHtmlElement } from "../../camera";
import watermark from "./watermark@10x.png";

export function InstagramComponent() {
  const canvasElt = createHtmlElement("canvas");
  async function onCapture(
    source: CanvasImageSource,
    width: number,
    height: number
  ) {
    canvasElt.style.display = "block";
    canvasElt.width = width;
    canvasElt.height = height;

    const context = canvasElt.getContext("2d");
    context.drawImage(source, 0, 0, width, height);

    var img = new Image();
    img.onload = function () {
      context.drawImage(img, 0, height - 280, 480, 280);
    };
    img.src = watermark;
  }

  function onDownload() {
    var dataUrl = canvasElt.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "my-image.png";
    link.href = dataUrl.replace("image/png", "image/octet-stream");
    link.click();
  }
  return (
    <div>
      <Camera onCapture={onCapture} width={400} height={400} />
      {canvasElt}
      <button click={onDownload}>download</button>
    </div>
  );
}
