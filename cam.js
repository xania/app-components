// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants

const cameraView = document.querySelector("#camera--view");
const cameraOutput = document.querySelector("#camera--output");
(cameraSensor = document.querySelector("#camera--sensor")),
  (cameraTrigger = document.querySelector("#camera--trigger"));

console.log("cameraView NS", cameraView.namespaceURI);
// Access the device camera and stream to cameraView
function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      cameraView.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function () {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("image/webp");
  cameraOutput.classList.add("taken");
};
// // Start the video stream when the window loads
// window.addEventListener("load", cameraStart, false);

cameraStart();
