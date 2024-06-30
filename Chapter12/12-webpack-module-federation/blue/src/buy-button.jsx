import "./style/buy-button.css";
import * as React from "react";
import { createRoot } from "react-dom/client";

const defaultPrice = "0,00 €";
const prices = {
  porsche: "66,00 €",
  fendt: "54,00 €",
  eicher: "58,00 €",
};

const BuyButton = ({ sku = "porsche" }) => {
  const price = prices[sku] || defaultPrice;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("add-item", { detail: price }));
      }}
    >
      <button>buy for {price}</button>
    </form>
  );
};

export default BuyButton;

export function renderBuyButton(container) {
  const root = createRoot(container);
  root.render(<BuyButton />);
}
