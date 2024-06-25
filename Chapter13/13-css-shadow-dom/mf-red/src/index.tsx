import * as React from "react";
import { Link } from "react-router-dom";
import type { PiletApi } from "sample-piral";
import { createWrapper } from "./utils";

import "./style.css";

const Page = React.lazy(() => import("./Page"));

export function setup(app: PiletApi) {
  const wrap = createWrapper("mf-red");

  app.registerPage("/red", wrap(Page));

  app.registerMenu(wrap(() => <Link to="/red">Red Page</Link>));

  app.registerTile(
    wrap(() => <div className="tile-background">Hello from Red!</div>),
    {
      initialColumns: 2,
      initialRows: 2,
    }
  );

  app.registerExtension(
    "red-extension",
    wrap(() => <output>I am groot (from red)</output>)
  );
}
