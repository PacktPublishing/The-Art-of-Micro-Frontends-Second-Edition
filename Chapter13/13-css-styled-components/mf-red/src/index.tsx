import * as React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import type { PiletApi } from "sample-piral";

const Tile = styled.div`
  background: red;
  color: white;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Output = styled.output`
  border: 1px dashed red;
  padding: 1rem;
  font-weight: bold;
`;

const Page = React.lazy(() => import("./Page"));

export function setup(app: PiletApi) {
  app.registerPage("/red", Page);

  app.registerMenu(() => <Link to="/red">Red Page</Link>);

  app.registerTile(
    () => <Tile>Hello from Red!</Tile>,
    {
      initialColumns: 2,
      initialRows: 2,
    }
  );

  app.registerExtension("red-extension", () => <Output>I am groot (from red)</Output>);
}
