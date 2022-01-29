import { jsx } from "@xania/view";
import { createHtmlElement } from "@xania/view/lib/util/create-dom";
import { uploadFiles } from "../services/storage/upload-files";

import "./style.scss";

// Set constraints for the video stream
const constraints = { video: { facingMode: "environment" }, audio: false };

export function CameraComponent() {
  const canvasElt = createHtmlElement("canvas");

  const videoElt = createHtmlElement("video");
  videoElt.id = "camera--view";
  videoElt.autoplay = true;
  videoElt.playsInline = true;

  return (
    <div>
      {videoElt}
      {canvasElt}
      <div class="button-container">
        <button click={capture}>capture</button>
      </div>
      {startCamera}
    </div>
  );

  function capture() {
    canvasElt.classList.remove("taken");
    canvasElt.style.display = "block";
    canvasElt.width = videoElt.videoWidth / 1.414;
    canvasElt.height = videoElt.videoHeight / 1.414;
    canvasElt
      .getContext("2d")
      .drawImage(videoElt, 0, 0, canvasElt.width, canvasElt.height);
    canvasElt.toBlob((blob) => {
      canvasElt.classList.add("taken");
      uploadFiles([new File([blob], new Date().toISOString() + ".png")]).then(
        () => {
          // canvasElt.style.display = "none";
        }
      );
    });

    //    imgElt.src = canvasElt.toDataURL("image/webp");
    //    imgElt.classList.add("taken");
  }

  function startCamera() {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoElt.srcObject = stream;
      })
      .catch((err) => {
        console.log("Oops. Something is broken.", err);
      });
  }
}
