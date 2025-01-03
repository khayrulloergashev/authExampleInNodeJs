const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const appRouter = require("./router");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;
const mongo_host = process.env.MONGO_HOST;

mongoose
  .connect(mongo_host)
  .then(() => {
    console.log("connected db");
  })
  .catch((err) => {
    console.log(`${new Date().toLocaleString()}`);
    console.log(err);
  });

app.use("/api", appRouter);

const root = path.join(__dirname, "../public/build");

app.use(express.static(root));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root });
});

app.listen(port, () => {
  console.log(`Server started on port : ${port}`);
});
