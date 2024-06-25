import * as React from 'react';
import { Link } from 'react-router-dom';
import type { PiletApi } from 'sample-piral';

import "./style.css";

const Page = React.lazy(() => import('./Page'));

export function setup(app: PiletApi) {
  app.registerPage('/blue', Page);

  app.registerMenu(() => <Link to="/blue">Blue Page</Link>);

  app.registerTile(
    () => <div className="mf-blue-tile-background">Hello from Blue!</div>,
    {
      initialColumns: 4,
      initialRows: 2,
    }
  );

  app.registerExtension("blue-extension", () => <output className="mf-blue">I'll be back (from blue)</output>);
}
