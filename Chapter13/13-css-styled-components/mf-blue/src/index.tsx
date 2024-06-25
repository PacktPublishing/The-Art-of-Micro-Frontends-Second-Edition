import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import type { PiletApi } from 'sample-piral';

const Tile = styled.div`
  background: blue;
  color: yellow;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Output = styled.output`
  border: 1px dashed blue;
  background: #ccc;
  color: #555;
  padding: 1rem;
  font-weight: bold;
`;

const Page = React.lazy(() => import('./Page'));

export function setup(app: PiletApi) {
  app.registerPage('/blue', Page);

  app.registerMenu(() => <Link to="/blue">Blue Page</Link>);

  app.registerTile(
    () => <Tile>Hello from Blue!</Tile>,
    {
      initialColumns: 4,
      initialRows: 2,
    }
  );

  app.registerExtension("blue-extension", () => <Output>I'll be back (from blue)</Output>);
}
