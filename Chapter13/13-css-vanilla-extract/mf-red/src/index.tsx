import * as React from "react";
import { Link } from "react-router-dom";
import type { PiletApi } from "sample-piral";
import { tile, output } from "./index.css.ts";

const Page = React.lazy(() => import("./Page"));

export function setup(app: PiletApi) {
  app.registerPage("/red", Page);

  app.registerMenu(() => <Link to="/red">Red Page</Link>);

  app.registerTile(
    () => <div className={tile}>Hello from Red!</div>,
    {
      initialColumns: 2,
      initialRows: 2,
    }
  );

  app.registerExtension("red-extension", () => <output className={output}>I am groot (from red)</output>);
}
