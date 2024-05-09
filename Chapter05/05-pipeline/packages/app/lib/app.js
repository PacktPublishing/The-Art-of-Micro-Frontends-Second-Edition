"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 1234;

app.set("view engine", "pug");

app.get("/", (_, res) => {
  res.render("index", { title: "Sample", message: "Index" });
});

// set up the micro frontends
require("@aom/mife-1")(app);
require("@aom/mife-2")(app);

app.listen(port, () => {
  console.log(`Running at ${port}.`);
});
