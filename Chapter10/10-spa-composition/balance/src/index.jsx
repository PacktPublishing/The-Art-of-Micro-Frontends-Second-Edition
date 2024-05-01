import * as React from "react";
import { render } from "react-dom";

let BalanceSheet = undefined;

window.registerComponent("balance", "sheet", {
  bootstrap: () =>
    import("./BalanceSheet").then((content) => {
      BalanceSheet = content.BalanceSheet;
    }),
  mount: (target) => render(<BalanceSheet />, target),
  unmount: (target) => render(null, target),
});

window.activateOnUrlChange(
  "balance",
  "sheet",
  (location) => location.pathname === "/"
);
