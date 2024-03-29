// server/api.js

const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const config = require("../config/config");

exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

exports.adminCheck = function(req, res, next) {
  const roles = req.user[config.NAMESPACE] || [];
  if (roles.indexOf("admin") > -1) {
    next();
  } else {
    res.status(401).send({ message: "Not authorized for admin access" });
  }
};

const jwtConst = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: config.AUTH0_API_AUDIENCE,
  issuer: `https://${config.AUTH0_DOMAIN}/`,
  algorithm: "RS256"
});

exports.jwtCheck = jwtConst; //Check token is valid
