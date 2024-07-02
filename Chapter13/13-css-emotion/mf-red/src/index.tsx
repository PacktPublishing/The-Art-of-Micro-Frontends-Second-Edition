import { lazy } from "react";
import { Link } from "react-router-dom";
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import type { PiletApi } from "sample-piral";

const Page = lazy(() => import("./Page"));
const Output = styled.output`
  border: 1px dashed red;
  padding: 1rem;
  font-weight: bold;
`;

export function setup(app: PiletApi) {
  app.registerPage("/red", Page);

  app.registerMenu(() => <Link to="/red">Red Page</Link>);

  app.registerTile(
    () => (
      <div
        css={css`
          background: red;
          color: white;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        Hello from Red!
      </div>
    ),
    {
      initialColumns: 2,
      initialRows: 2,
    }
  );

  app.registerExtension("red-extension", () => (
    <Output>I am groot (from red)</Output>
  ));
}
