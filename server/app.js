// app.js
const express = require("express");
const bodyParser = require("body-parser");

// initialize our express app
// const product = require("./routes/product.route"); // Imports routes for the products

//Get API
// song, review,  and user
const apiUser = require("./routes/user.route");
const apiDMCA = require("./routes/dmca.route");

const app = express();

//Set up mongoose connection
{
  var mongoose = require("mongoose");
  const mongoDB =
    "mongodb+srv://admin:admin@lab-5-mrelb.mongodb.net/test?retryWrites=true&w=majority";
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/products", product);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let port = 8081;

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
