"use strict";
const express = require("express");
const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer();
const app = express();
const port = process.env.GW_PORT || 1234;

const lookup = {
  "/mf1": `http://localhost:${process.env.MF1_PORT || 2001}`,
  "/mf2": `http://localhost:${process.env.MF2_PORT || 2002}`,
};

app.set("view engine", "pug");

app.get("/", (_, res) => {
  res.render("index", { title: "Sample", message: "Index" });
});

app.use((req, res) => {
  const [prefix] = Object.keys(lookup).filter((m) => req.path.startsWith(m));

  if (!prefix) {
    return res.status(404).send("Nothing found.");
  }

  const target = lookup[prefix];

  console.log('Going to target...', prefix, target);

  return proxy.web(req, res, { target }, e => {
    console.error(e);
    res.status(500).send('Something went wrong...');
  });
});

app.listen(port, () => {
  console.log(`Running at ${port}.`);
});
