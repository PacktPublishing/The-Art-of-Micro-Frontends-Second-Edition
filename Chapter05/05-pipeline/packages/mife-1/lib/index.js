"use strict";
const path = require("path");
const express = require("express");

module.exports = setupMicrofrontend1;

function setupMicrofrontend1(app) {
  app.use("/mf1", express.static(path.join(__dirname, "..", "public")));

  app.get("/mf1", (_, res) => {
    const page = require.resolve('../views/index.pug');
    res.render(page, { title: "Sample", message: "MF1" });
  });
}
