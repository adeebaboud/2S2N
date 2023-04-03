const express = require("express");
const scraper = require("./scraper.js");
const scraper = require("./updater.js");
const app = express();
const port = 5000;

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.send("Hello From Node");
});

app.get("/api/scraper/:link", (req, res, next) => {
  var importurl = req.param("link");
  scraper.getProductsData(importurl).then((result) => {
    if (result) {
      const final = result.flat();
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(final));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify("error"));
    }
  });
});

app.get("/api/updater/:link", (req, res, next) => {
  console.log("Requesting");
  var importurl = req.param("link");
  updater.getProductsData(importurl).then((result) => {
    if (result) {
      const final = result.flat();
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(final));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify("error"));
    }
  });
});
app.listen(port, () => {
  console.log("Node App listening at port " + port);

});
