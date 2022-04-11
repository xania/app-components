import { jsx } from "@xania/view";

const constraints = { video: { facingMode: "environment" }, audio: false };

interface CameraProps {
  onCapture(source: CanvasImageSource, width: number, height: number): void;
  width: number;
  height: number;
}

export function Camera(props: CameraProps) {
  const videoElt = createHtmlElement("video");
  videoElt.id = "camera--view";
  videoElt.autoplay = true;
  videoElt.playsInline = true;
  videoElt.width = props.width;
  videoElt.height = props.height;

  const mediaStream = navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      videoElt.srcObject = stream;
      return stream;
    })
    .catch((err) => {
      console.log("Oops. Something is broken.", err);
    });

  async function onCapture() {
    props.onCapture(videoElt, videoElt.videoWidth, videoElt.videoHeight);
  }

  return [
    <button click={onCapture}>Capture</button>,
    videoElt,
    {
      dispose() {
        mediaStream.then((stream) => {
          if (stream) {
            stream.getTracks().forEach(function (track) {
              if (track.readyState == "live") {
                track.stop();
              }
            });
          }
        });
      },
    },
  ];
}

export function createHtmlElement<K extends keyof HTMLElementTagNameMap>(
  name: K
) {
  return document.createElement(name) as HTMLElementTagNameMap[K];
}
