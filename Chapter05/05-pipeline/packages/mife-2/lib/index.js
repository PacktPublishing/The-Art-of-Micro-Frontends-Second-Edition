"use strict";
const path = require("path");
const express = require("express");

module.exports = mife2;

function mife2(app) {
  app.use("/mf2", express.static(path.join(__dirname, "..", "public")));

  app.get("/mf2", (_, res) => {
    const page = require.resolve("../views/index.pug");
    res.render(page, { title: "Sample", message: "MF2" });
  });
}
