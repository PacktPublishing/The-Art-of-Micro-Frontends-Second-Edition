import * as React from "react";
import { Link } from "react-router-dom";
import type { PiletApi } from "sample-piral";

import "./style.css";

const Page = React.lazy(() => import("./Page"));

export function setup(app: PiletApi) {
  app.registerPage("/red", Page);

  app.registerMenu(() => <Link to="/red">Red Page</Link>);

  app.registerTile(
    () => <div className="bg-red-600 text-white flex flex-1 justify-center items-center">Hello from Red!</div>,
    {
      initialColumns: 2,
      initialRows: 2,
    }
  );

  app.registerExtension("red-extension", () => <output className="border-red-600 border-dashed p-4 font-bold">I am groot (from red)</output>);
}
