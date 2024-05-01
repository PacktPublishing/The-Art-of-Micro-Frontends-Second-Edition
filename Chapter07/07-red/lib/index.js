const express = require("express");
const path = require("path");
const { renderFile } = require("ejs");

const app = express();

const port = process.env.PORT || 2001;
const host = `http://localhost:${port}`;
const product = {
  name: "Tractor",
  variants: [
    {
      sku: "porsche",
      color: "red",
      name: "Porsche-Diesel Master 419",
      image: "tractor-red.jpg",
      thumb: "tractor-red-thumb.jpg",
      price: "66,00 €",
    },
    {
      sku: "fendt",
      color: "green",
      name: "Fendt F20 Dieselroß",
      image: "tractor-green.jpg",
      thumb: "tractor-green-thumb.jpg",
      price: "54,00 €",
    },
    {
      sku: "eicher",
      color: "blue",
      name: "Eicher Diesel 215/16",
      image: "tractor-blue.jpg",
      thumb: "tractor-blue-thumb.jpg",
      price: "58,00 €",
    },
  ],
};

app.set("views", path.resolve(__dirname, "..", "views"));
app.engine("html", renderFile);
app.set("view engine", "html");
app.set("trust proxy", 1);

app.use(express.static("public"));

app.get("/product-page", (req, res) => {
  const sku = req.query.sku || "porsche";
  const current =
    product.variants.filter((v) => v.sku === sku)[0] || product.variants[0];

  res.render("product-page", {
    product,
    current,
  });
});

app.listen(port, () => {
  console.log(`[OK] MF-Red running at ${host} ...`);
});
