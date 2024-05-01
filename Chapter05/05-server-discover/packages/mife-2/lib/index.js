"use strict";
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.MF2_PORT || 2002;

app.set("view engine", "pug");

app.use("/mf2", express.static(path.join(__dirname, "..", "public")));

app.get("/mf2", (_, res) => {
  res.render('index', { title: "Sample", message: "MF2" });
});

app.listen(port, () => {
  console.log(`Running at ${port}.`);
});
