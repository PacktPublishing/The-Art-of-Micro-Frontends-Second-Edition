"use strict";
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.MF1_PORT || 2001;

app.set("view engine", "pug");

app.use("/mf1", express.static(path.join(__dirname, "..", "public")));

app.get("/mf1", (_, res) => {
  res.render('index', { title: "Sample", message: "MF1" });
});

app.listen(port, () => {
  console.log(`Running at ${port}.`);
});
