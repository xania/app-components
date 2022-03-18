import { jsx } from "@xania/view";
import QRious from "qrious";
import styles from "./qr-matrix.module.scss";
import "./qr-matrix.scss";

function range(len: number) {
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = i;
  }
  return arr;
}
function randomId() {
  return btoa(Math.random().toString()).substring(10, 5);
}
export function QRMatrix() {
  return (
    <div class={["matrix", styles.matrix]}>
      {range(30)
        .map(randomId)
        .map((i) => (
          <>
            <div class={styles.cutblock}>
              <QRCode id={i} />
            </div>
            <div class={styles.cutblock}>
              <QRCode id={i} />
            </div>
            <div class={styles.cutblock}>
              <QRCode id={i} />
            </div>
            <div class={styles.cutblock}>
              <QRCode id={i} />
            </div>
          </>
        ))}
    </div>
  );
}

interface QRCodeProps {
  id: string | number;
}
function QRCode(props: QRCodeProps) {
  const canvas = document.createElement("canvas");

  var qr = new QRious({
    element: canvas,
    value: "https://www.app-components.com/jennah/menu/" + props.id,
  });
  qr.color = "red";

  return (
    <div class={styles.qrcode}>
      <h3>
        <span class={styles.hart}></span>Menu
      </h3>
      <div>{canvas}</div>
      <span class={styles.qrcode__id}>{props.id}</span>
    </div>
  );
}

/*

<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>

<div class="form">
  <h1>QR Code using qrcodejs</h1>
  <form>
    <input type="url" id="website" name="website" placeholder="https://webisora.com" required />
    <button type="button" onclick="generateQRCode()">
      Generate QR Code
    </button>
  </form>

  <div id="qrcode-container">
    <div id="qrcode" class="qrcode"></div>
    <h4>With some styles</h4>
    <div id="qrcode-2" class="qrcode"></div>
  </div>

  <script type="text/javascript">
    function generateQRCode() {
      let website = document.getElementById("website").value;
      if (website) {
        let qrcodeContainer = document.getElementById("qrcode");
        qrcodeContainer.innerHTML = "";
        new QRCode(qrcodeContainer, website);
        // With some styles
        let qrcodeContainer2 = document.getElementById("qrcode-2");
        qrcodeContainer2.innerHTML = "";
        new QRCode(qrcodeContainer2, {
          text: website,
          width: 128,
          height: 128,
          colorDark: "#5868bf",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
        document.getElementById("qrcode-container").style.display = "block";
      } else {
        alert("Please enter a valid URL");
      }
    }
  </script>
</div>

*/
