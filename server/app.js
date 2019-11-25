// app.js
const express = require("express");
const bodyParser = require("body-parser");

// initialize our express app
// const product = require("./routes/product.route"); // Imports routes for the products

//Get API. Routing everything through those routes before making models
// song, review,  and user
const apiSecure = require("./routes/secure.route.js");
const apiAdmin = require("./routes/admin.route");
const apiOpen = require("./routes/open.route");

const app = express();

//Set up mongoose connection
{
  var mongoose = require("mongoose");
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
