const passport = require("passport");
const JwtStartgy = require("passport-jwt").Strategy;
const fs = require("fs");
const path = require("path");
const User = require("../modules/user.module");
const publicKey = fs.readFileSync(path.join(__dirname, "../../id_EC_pup.pem"));

const extractCookies = (req) => {
  let token;
  if (!req.cookies.jwt) {
    token = null;
    return token;
  }
  return (token = req.cookies.jwt);
};

const strategy = new JwtStartgy(
  {
    jwtFromRequest: extractCookies,
    secretOrKey: publicKey,
    algorithms: ["ES256"],
  },
  (payload, done) => {
    User.findById(payload.sub)
      .then((user) => {
        if (!user) {
          return done(
            new Error("no user found with this id try to log in or sgin up "),
            false
          );
        }
        return done(null, user);
      })
      .catch((err) => done(err, false));
  }
);

module.exports = strategy;
