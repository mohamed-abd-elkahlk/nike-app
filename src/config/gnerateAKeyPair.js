const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const keyPair = crypto.generateKeyPairSync("ec", {
  namedCurve: "P-256",
});

const publicKey = keyPair.publicKey;
const privateKey = keyPair.privateKey;

const puplicKeyPath = path.join(__dirname, "../../id_EC_pup.pem");
const privteKeyPath = path.join(__dirname, "../../id_EC_priv.pem");

fs.writeFileSync(
  puplicKeyPath,
  publicKey.export({ format: "pem", type: "spki" }),
  "utf-8"
);
fs.writeFileSync(
  privteKeyPath,
  privateKey.export({ format: "pem", type: "sec1" }),
  "utf-8"
);
