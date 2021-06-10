const { customAlphabet } = require("nanoid");
const fs = require("fs");
const path = require("path");

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
    fs.readFile(
      path.resolve(__dirname, "index.html"),
      { encoding: "utf8" },
      (err, body) => {
        if (err) {
          console.warn("Failed to read html", err);
          callback(null, {
            statusCode: 500,
            isBase64Encoded: false,
            headers: {
              "Content-Type": "text/plain",
            },
            body: "Internal server error",
          });
          return;
        }

        callback(null, {
          statusCode: 200,
          isBase64Encoded: false,
          headers: {
            "Content-Type": "text/html; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": false,
          },
          body,
        });
      }
    );
  }
};

if (require.main === module) {
  main(null, null);
}
