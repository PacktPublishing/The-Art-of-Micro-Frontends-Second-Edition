import * as React from "react";
import { createPortal } from "react-dom";

import css from "./style.css";

export function createWrapper(name: string) {
  customElements.define(
    name,
    class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }

      connectedCallback() {
        this.style.display = "contents";
        const style = this.shadowRoot.appendChild(document.createElement('style'));
        style.textContent = css;
      }
    }
  );

  function wrap(Component: React.FC<any>) {
    return (props) => {
      const container = React.useRef<HTMLElement>();
      const [portal, setPortal] = React.useState(undefined);

      React.useEffect(() => {
        setPortal(
          createPortal(<Component {...props} />, container.current.shadowRoot)
        );
      }, []);

      return React.createElement(name, { ref: container }, portal);
    };
  }

  return wrap;
}
