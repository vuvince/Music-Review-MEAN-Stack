// server/api.js

const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

exports.auth_user = function(req, config) {
  const jwtCheck = jwt({
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
};

exports.adminCheck = function(req, res, next) {
  const roles = req.user[config.NAMESPACE] || [];
  if (roles.indexOf("admin") > -1) {
    next();
  } else {
    res.status(401).send({ message: "Not authorized for admin access" });
  }
};

/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */

// module.exports = function(app, config) {
//   // Authentication middleware
//   const jwtCheck = jwt({
//     secret: jwks.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
//     }),
//     audience: config.AUTH0_API_AUDIENCE,
//     issuer: `https://${config.AUTH0_DOMAIN}/`,
//     algorithm: "RS256"
//   });

//   // Check for an authenticated admin user
//   const adminCheck = (req, res, next) => {
//     const roles = req.user[config.NAMESPACE] || [];
//     if (roles.indexOf("admin") > -1) {
//       next();
//     } else {
//       res.status(401).send({ message: "Not authorized for admin access" });
//     }
//   };

//   /*
//  |--------------------------------------
//  | API Routes
//  |--------------------------------------
//  */

//   // GET API root
//   app.get("/api/", (req, res) => {
//     res.send("API works");
//   });
// };
