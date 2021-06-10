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
      body: `<link rel="stylesheet" href="https://unpkg.com/mvp.css">
      <script>function load() {
        fetch("?api")
          .then(response => response.json())
          .then(json => document.getElementById("hexspeak").value = json.hexspeak)

        window.onload = () => { setTimeout(load, 100); }
      }</script>
      <div style="display: flex;flex-direction: column;justify-content: center;height: 100vh;"><div style="text-align: center;">
      <a href="?api" onClick="event.preventDefault(); load()">
      <form><input id="hexspeak" size="20" disabled readonly style="text-align: center;color: black;"></form>
      <b>Hexspeak me!</b>
      </a></div>
      </div>`,
    });
  }
};

if (require.main === module) {
  main(null, null);
}
