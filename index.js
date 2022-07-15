const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const djRouter = require("./Routes/DjRoutes");
const djCategorie = require("./Routes/DjCategorieRoutes");
const eventType = require("./Routes/EventTypeRoute");
const party = require("./Routes/PartyRoutes");

const bodyParser = require("body-parser");
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "*");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }));

// get driver connection

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(
    "mongodb+srv://freelancer:m5Y0YY2WWXjxM3Mr@cluster0.cspwo.mongodb.net/docorWebsit?retryWrites=true&w=majority",
    connectionParams
  )
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
app.use("/djImages", express.static("./profileImages"));

app.use("/dj", djRouter);
app.use("/djCategorie", djCategorie);
app.use("/eventType", eventType);
app.use("/party", party);

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

// perform a database connection when server starts
app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});
