import * as React from "react";
import { render } from "react-dom";

export function setup(api) {
  let BalanceSheet = undefined;

  api.registerPage("/", {
    bootstrap: () =>
      import("./BalanceSheet").then((content) => {
        BalanceSheet = content.BalanceSheet;
      }),
    mount: (target) => render(<BalanceSheet onRender={api.renderExtension} />, target),
    unmount: (target) => render(null, target),
  });
}
