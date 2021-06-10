const { customAlphabet } = require("nanoid");

const alphabet =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const deadbeef = [
  "0ff1ce",
  "10cc",
  "1ce",
  "ab1e",
  "abad",
  "b00b",
  "b00b5",
  "b00c",
  "b10b",
  "ba11",
  "ba5e",
  "baaad",
  "baad",
  "babe",
  "bad",
  "beef",
  "c0de",
  "ca11",
  "caca",
  "cafe",
  "cefa",
  "d00d",
  "d0d0",
  "dead",
  "decaf",
  "def",
  "defec",
  "edfe",
  "f00d",
  "f01d",
  "fa11",
  "face",
  "face",
  "fee1",
  "feed",
];

const hexspeak = (n) =>
  customAlphabet(alphabet.substring(0, deadbeef.length), n)()
    .split("")
    .map((s) => deadbeef[alphabet.indexOf(s)])
    .join("");

module.exports.handler = (event, context, callback) => {
  if (
    event.queryStringParameters &&
    event.queryStringParameters.api !== undefined
  ) {
    callback(null, {
      statusCode: 200,
      isBase64Encoded: false,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": false,
      },
      body: JSON.stringify({ hexspeak: hexspeak(4) }),
    });
  } else {
    callback(null, {
      statusCode: 200,
      isBase64Encoded: false,
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": false,
      },
      body: `<html><head>
      <title>Hexspeak</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"">
      <link rel="stylesheet" href="https://unpkg.com/mvp.css">
      <script>function load() {
        fetch("?api")
          .then(response => response.json())
          .then(json => document.getElementById("hexspeak").value = json.hexspeak)

        window.onload = () => { setTimeout(load, 100); }
      }</script></head><body>
      <div style="display: flex;flex-direction: column;justify-content: center;height: 100vh;">
      <div style="display: flex;justify-content: center;flex-direction: column;align-items: center;>
      <form style="display: flex; justify-content: center;"><input id="hexspeak" size="20" disabled readonly style="text-align: center;color: black;"></form>
      <a href="?api" onClick="event.preventDefault(); load()">
      <b>Hexspeak me!</b>
      </a></div>
      <a href="https://github.com/huksley/hexspeak" class="github-corner" 
      style="position: fixed; top: 0px; right: 0px;" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
      </div>
      </body>
      </html>`,
    });
  }
};

if (require.main === module) {
  main(null, null);
}
