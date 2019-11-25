// code from https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8

// const jwt = require("jsonwebtoken");
const config = require("config");
const { User, validate } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

//Used to check if client is valid
exports.verifyToken = function(req, res, next) {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.get("myprivatekey"));
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};

//Get current user
exports.current_user = async function(req, res) {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

//Register User
exports.register_user = async function(req, res) {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user, has to be unique email
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
    email: user.email
  });
};

//Authentication from https://auth0.com/blog/real-world-angular-series-part-1/#intro
exports.auth0 = function(app, config) {
  // Authentication middleware
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
