// app.js
const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cors = require("cors");

// const product = require("./routes/product.route"); // Imports routes for the products

//Get API. Routing everything through those routes before making models
const apiSecure = require("./routes/secure.route.js");
const apiAdmin = require("./routes/admin.route");
const apiOpen = require("./routes/open.route");
const apiUser = require("./routes/user.route");

const api = require("./routes/api.route");
// const apiConfig = require("./config/config");
// const api = require("./routes/api.route")(app, apiConfig); //Routes for the API that deals with authentication

//SEE IF WE HAVE PRIVATE KEY
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

// initialize our express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(cors());

//Set up mongoose connection
{
  const mongoDB =
    "mongodb+srv://vvu9:TLLWiAQJ4RpRW7WK@lab5-mrelb.mongodb.net/test?retryWrites=true&w=majority";
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

// For POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Setting Routes
app.use("/api/secure", apiSecure);
app.use("/api/admin", apiAdmin);
app.use("/api/open", apiOpen);
app.use("/api/users", apiUser);
// app.use("/products", product);
app.use("/api", api);
// require("./controllers/api.controller")(app, apiConfig);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Server Running
let port = 8081;

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});

// server.js;
