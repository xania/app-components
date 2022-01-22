import { jsx } from "@xania/view";
import { createHtmlElement } from "@xania/view/lib/util/create-dom";

import "./style.scss";

// Set constraints for the video stream
const constraints = { video: { facingMode: "user" }, audio: false };

export function CameraComponent() {
  const canvasElt = createHtmlElement("canvas");

  const videoElt = createHtmlElement("video");
  videoElt.setAttribute("autoplay", "true");
  videoElt.setAttribute("playsinline", "true");

  const imgElt = createHtmlElement("img");
  imgElt.src = "//:0";
  imgElt.alt = "";

  //  <img src="//:0" alt="" id="camera--output">

  return (
    <div>
      {videoElt}
      {canvasElt}
      {imgElt}
      <button click={capture}>capture</button>
      {startCamera}
    </div>
  );

  function capture() {
    canvasElt.width = videoElt.videoWidth;
    canvasElt.height = videoElt.videoHeight;
    canvasElt.getContext("2d").drawImage(videoElt, 0, 0);
    imgElt.src = canvasElt.toDataURL("image/webp");
    imgElt.classList.add("taken");
  }

  function startCamera() {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const track = stream.getTracks()[0];
        console.log(track);
        videoElt.srcObject = stream;
        stream;
      })
      .catch((err) => {
        console.error("Oops. Something is broken.", err);
      });
  }
}
