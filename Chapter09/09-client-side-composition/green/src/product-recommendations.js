import "./style/recommendations.css";
import reco1 from "./images/reco_1.jpg";
import reco2 from "./images/reco_2.jpg";
import reco3 from "./images/reco_3.jpg";
import reco4 from "./images/reco_4.jpg";
import reco5 from "./images/reco_5.jpg";
import reco6 from "./images/reco_6.jpg";
import reco7 from "./images/reco_7.jpg";
import reco8 from "./images/reco_8.jpg";
import reco9 from "./images/reco_9.jpg";

const recos = {
  1: reco1,
  2: reco2,
  3: reco3,
  4: reco4,
  5: reco5,
  6: reco6,
  7: reco7,
  8: reco8,
  9: reco9,
};
const allRecommendations = {
  porsche: ["3", "5", "6"],
  fendt: ["3", "6", "4"],
  eicher: ["1", "8", "7"],
};

class ProductRecommendations extends HTMLElement {
  constructor() {
    super();
    const sku = this.getAttribute("sku") || "porsche";
    this.render(sku);
  }

  static get observedAttributes() {
    return ["sku"];
  }

  render(sku) {
    const recommendations =
      allRecommendations[sku] || allRecommendations.porsche;

    this.innerHTML = `
<h3>Related Products</h3>
${recommendations
  .map((id) => `<img src="${recos[id]}" alt="Recommendation ${id}">`)
  .join("")}
  `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "sku" && oldValue !== newValue) {
      this.render(newValue);
    }
  }
}

customElements.define("product-recommendations", ProductRecommendations);
