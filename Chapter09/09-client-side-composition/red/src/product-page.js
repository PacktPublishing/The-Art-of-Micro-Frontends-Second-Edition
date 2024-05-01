import "./style/product-page.css";
import tractorRed from "./images/tractor-red.jpg";
import tractorBlue from "./images/tractor-blue.jpg";
import tractorGreen from "./images/tractor-green.jpg";
import tractorRedThumb from "./images/tractor-red-thumb.jpg";
import tractorBlueThumb from "./images/tractor-blue-thumb.jpg";
import tractorGreenThumb from "./images/tractor-green-thumb.jpg";

const product = {
  name: "Tractor",
  variants: [
    {
      sku: "porsche",
      color: "red",
      name: "Porsche-Diesel Master 419",
      image: tractorRed,
      thumb: tractorRedThumb,
      price: "66,00 €",
    },
    {
      sku: "fendt",
      color: "green",
      name: "Fendt F20 Dieselroß",
      image: tractorGreen,
      thumb: tractorGreenThumb,
      price: "54,00 €",
    },
    {
      sku: "eicher",
      color: "blue",
      name: "Eicher Diesel 215/16",
      image: tractorBlue,
      thumb: tractorBlueThumb,
      price: "58,00 €",
    },
  ],
};

function renderOptions(sku) {
  return product.variants
    .map(
      (variant) => `
<button class="${
        sku === variant.sku ? "active" : ""
      }" type="button" data-sku="${variant.sku}">
  <img src="${variant.thumb}" alt="${variant.name}" />
</button>
`
    )
    .join("");
}

class ProductPage extends HTMLElement {
  constructor() {
    super();
    const sku = this.getAttribute("sku") || "porsche";
    const current =
      product.variants.filter((v) => v.sku === sku)[0] || product.variants[0];

    this.innerHTML = `
<h1 id="store">The Model Store</h1>
<basket-info sku="${sku}" class="blue-basket" id="basket"></basket-info>
<div id="image">
  <div>
    <img src="${current.image}" alt="${current.name}" />
  </div>
</div>
<h2 id="name">
  ${product.name} <small>${current.name}</small>
</h2>
<div id="options">
  ${renderOptions(current.sku)}
</div>
<buy-button sku="${sku}" class="blue-buy" id="buy"></buy-button>
<product-recommendations sku="${sku}" class="green-recos" id="reco"></product-recommendations>
    `;

    this.querySelectorAll("#options button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const sku = button.dataset.sku;
        this.setAttribute("sku", sku);
      });
    });
  }

  static get observedAttributes() {
    return ["sku"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "sku" && oldValue !== newValue) {
      this.querySelector("#basket").setAttribute("sku", newValue);
      this.querySelector("#buy").setAttribute("sku", newValue);
      this.querySelector("#reco").setAttribute("sku", newValue);
      this.querySelectorAll("#options button").forEach((button) => {
        if (button.dataset.sku === newValue) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    }
  }
}

customElements.define("product-page", ProductPage);
