const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const privteKey = fs.readFileSync(
  path.join(__dirname, "../../../id_EC_priv.pem"),
  "utf-8"
);
const publicKey = fs.readFileSync(
  path.join(__dirname, "../../../id_EC_pup.pem"),
  "utf-8"
);

exports.issueJwt = (user) => {
  const id = user._id;
  const { role } = user;
  const payload = {
    id,
    iat: Date.now(),
    role,
  };

  const token = jwt.sign(payload, privteKey, {
    algorithm: "ES256",
    expiresIn: "7d",
  });
  return token;
};

exports.verfiyToken = (jwtToken) => {
  const docodeToken = jwt.verify(jwtToken, publicKey);

  return docodeToken;
};

exports.genPasswordHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  return passwordHash;
};

exports.verifyPasswordHash = (password, hashedPassword) => {
  const match = bcrypt.compareSync(password, hashedPassword);
};
