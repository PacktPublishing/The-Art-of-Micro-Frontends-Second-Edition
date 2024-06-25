import * as React from "react";
import { Link } from "react-router-dom";
import type { PiletApi } from "sample-piral";
import { createWrapper } from "./utils";

const Page = React.lazy(() => import("./Page"));

export function setup(app: PiletApi) {
  const wrap = createWrapper("mf-blue");

  app.registerPage("/blue", wrap(Page));

  app.registerMenu(wrap(() => <Link to="/blue">Blue Page</Link>));

  app.registerTile(
    wrap(() => <div className="tile-background">Hello from Blue!</div>),
    {
      initialColumns: 4,
      initialRows: 2,
    }
  );

  app.registerExtension(
    "blue-extension",
    wrap(() => <output>I'll be back (from blue)</output>)
  );
}
