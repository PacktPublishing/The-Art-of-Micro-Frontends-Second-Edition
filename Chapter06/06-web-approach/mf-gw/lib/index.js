const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = process.env.PORT || 1234;

const targets = {
  "/mf1": "http://localhost:2001",
  "/mf2": "http://localhost:2002",
};

app.get("/", (_, res) => res.redirect(Object.keys(targets)[0]));

Object.keys(targets).forEach((prefix) => {
  app.use(
    prefix,
    createProxyMiddleware({
      target: targets[prefix],
      changeOrigin: true,
    })
  );
});

app.get("*", (_, res) => res.status(404).send("Page not found."));

app.listen(port, () => {
  console.log(`Micro Frontend gateway running at ${port}.`);
});
