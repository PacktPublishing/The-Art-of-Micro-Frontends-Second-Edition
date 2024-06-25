import * as React from "react";
import { createPortal } from "react-dom";

const sheets: Array<Element> = [];

export function createWrapper(name: string) {
  document.querySelectorAll(`link[data-origin=${name}]`).forEach((m) => {
    m.remove();
    sheets.push(m);
  });

  customElements.define(
    name,
    class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }

      connectedCallback() {
        this.style.display = "contents";
        sheets.forEach((m) => this.shadowRoot.appendChild(m.cloneNode()));
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
