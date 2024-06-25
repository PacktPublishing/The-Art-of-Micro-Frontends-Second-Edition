import * as React from 'react';
import { page } from "./Page.css.ts";

export default () => {
  return (
    <div className={page}>
      <h2>Red Title (should be colored likewise)</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat reiciendis illum qui nulla adipisci, laudantium
        vitae atque dicta blanditiis ab. Quae deleniti eum sapiente temporibus tenetur, maxime quibusdam iure nisi.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus assumenda adipisci autem et nam quis, corporis
        maxime id? Commodi maiores eligendi similique velit porro consectetur! Voluptates quo autem omnis deserunt?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis similique veritatis nesciunt non esse commodi
        eligendi fugit officia earum distinctio. Mollitia blanditiis iusto cum pariatur quaerat fuga qui molestias
        delectus?
      </p>
      <piral-extension name="blue-extension"></piral-extension>
    </div>
  );
};
