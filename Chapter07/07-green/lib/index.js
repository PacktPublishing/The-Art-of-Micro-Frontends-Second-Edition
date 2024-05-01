const express = require("express");
const path = require("path");
const { renderFile } = require("ejs");

const app = express();

const port = process.env.PORT || 2003;
const host = `http://localhost:${port}`;
const allRecommendations = {
  porsche: ["3", "5", "6"],
  fendt: ["3", "6", "4"],
  eicher: ["1", "8", "7"],
};

app.set("views", path.resolve(__dirname, "..", "views"));
app.engine("html", renderFile);
app.set("view engine", "html");
app.set("trust proxy", 1);

app.use(express.static('public'));

app.get("/recommendations", (req, res) => {
  const sku = req.query.sku || "porsche";

  res.render("recommendations", {
    recommendations: allRecommendations[sku] || allRecommendations.porsche,
  });
});

app.listen(port, () => {
  console.log(`[OK] MF-Green running at ${host} ...`);
});
