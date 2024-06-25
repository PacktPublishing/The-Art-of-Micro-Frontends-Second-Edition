import * as React from 'react';
import { Link } from 'react-router-dom';
import type { PiletApi } from 'sample-piral';
import { css } from '@emotion/css';

const Page = React.lazy(() => import('./Page'));

const tile = css`
  background: blue;
  color: yellow;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const output = css`
  border: 1px dashed blue;
  background: #ccc;
  color: #555;
  padding: 1rem;
  font-weight: bold;
`;

export function setup(app: PiletApi) {
  app.registerPage('/blue', Page);

  app.registerMenu(() => <Link to="/blue">Blue Page</Link>);

  app.registerTile(
    () => <div className={tile}>Hello from Blue!</div>,
    {
      initialColumns: 4,
      initialRows: 2,
    }
  );

  app.registerExtension("blue-extension", () => <output className={output}>I'll be back (from blue)</output>);
}
