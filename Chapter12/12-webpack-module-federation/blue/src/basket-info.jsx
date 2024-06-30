import "./style/basket-info.css";
import * as React from "react";
import { createRoot } from "react-dom/client";

const BasketInfo = ({ sku = "porsche" }) => {
  const [items, setItems] = React.useState([]);
  const count = items.length;

  React.useEffect(() => {
    const handler = () => {
      setItems((items) => [...items, sku]);
    };
    window.addEventListener("add-item", handler);
    return () => window.removeEventListener("add-item", handler);
  }, [sku]);

  return (
    <div className={count === 0 ? "empty" : "filled"}>basket: {count} item(s)</div>
  );
};

export default BasketInfo;

export function renderBasketInfo(container) {
  const root = createRoot(container);
  root.render(<BasketInfo />);
}
