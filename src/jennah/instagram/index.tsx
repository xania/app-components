import { jsx } from "@xania/view";
import { Camera, createHtmlElement } from "../../camera";
import watermark from "./watermark.svg";

export function InstagramComponent() {
  const canvasElt = createHtmlElement("canvas");
  canvasElt.style.display = "block";

  function onDownload() {
    var dataUrl = canvasElt.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "jennah-instagram.png";
    link.href = dataUrl; // .replace("image/png", "image/octet-stream");
    link.click();
  }

  function handleFiles(e) {
    var img = new Image();
    img.onload = function () {
      canvasElt.width = img.width;
      canvasElt.height = img.height;

      const context = canvasElt.getContext("2d");
      context.drawImage(img, 0, 0);

      var waterImg = new Image();
      waterImg.onload = function () {
        context.drawImage(waterImg, 0, img.height - 300, 480, 280);
      };
      waterImg.src = watermark;
    };
    img.src = URL.createObjectURL(e.event.target.files[0]);
  }
  return (
    <div>
      <input type="file" change={handleFiles} />
      {/* <Camera onCapture={onCapture} width={400} height={400} /> */}
      {canvasElt}
      <button click={onDownload}>download</button>
    </div>
  );
}
