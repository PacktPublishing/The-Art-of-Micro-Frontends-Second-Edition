const express = require("express");
const session = require("express-session");
const path = require("path");
const { renderFile } = require("ejs");

const app = express();

const port = process.env.PORT || 2002;
const host = `http://localhost:${port}`;
const defaultPrice = "0,00 €";
const prices = {
  porsche: "66,00 €",
  fendt: "54,00 €",
  eicher: "58,00 €",
};

app.set("views", path.resolve(__dirname, "..", "views"));
app.engine("html", renderFile);
app.set("view engine", "html");
app.set("trust proxy", 1);

app.use(
  session({
    secret: "foobar-blue",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/blue", express.static("public"));

app.post("/blue/buy-button", (req, res) => {
  const sku = req.body.sku || "porsche";
  const price = prices[sku] || defaultPrice;
  const value = parseFloat(price.replace(",", "."));

  if (req.session.sum) {
    req.session.sum += value;
    req.session.count++;
  } else {
    req.session.sum = value;
    req.session.count = 1;
  }

  res.redirect(`http://localhost:1234/red/product-page?sku=${sku}`);
});

app.get("/blue/basket-info", (req, res) => {
  res.render("basket-info", {
    count: req.session.count || 0,
  });
});

app.get("/blue/buy-button", (req, res) => {
  const sku = req.query.sku || "porsche";

  res.render("buy-button", {
    sku,
    price: prices[sku] || defaultPrice,
  });
});

app.listen(port, () => {
  console.log(`[OK] MF-Blue running at ${host} ...`);
});
