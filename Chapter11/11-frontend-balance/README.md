# Chapter 11

## Prerequisites

The following software is required to run the sample:

- Git
- Node.js
- npm

## Running

Go to the current directory and run NPM install:

```sh
npm install
```

Now start the application:

```sh
npm start
```

## Steps

Follow these steps to implement the same from scratch.

1. Initialize a new project and add the dependencies

```sh
npm init -y
npm install react react-dom --save
npm install @babel/core @babel/preset-env @babel/preset-react babel-loader file-loader style-loader webpack webpack-cli --save-dev
```

2. Add a *webpack.config.js* and make sure to target `library` (with the name of the package)

3. Add a *.babelrc* for Babel using the `preset-react`:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

4. Copy over the balance sheet code from the previous sample

5. Change the `index.jsx` to export a `setup` function

```js
export function setup(api) {
  let BalanceSheet = undefined;

  api.registerPage("/", {
    bootstrap: () =>
      import("./BalanceSheet").then((content) => {
        BalanceSheet = content.BalanceSheet;
      }),
    mount: (target) => render(<BalanceSheet onRender={api.renderExtension} />, target),
    unmount: (target) => render(null, target),
  });
}
```

6. Change the `BalanceSheet` to forward the `onRender` prop, pointing to the `renderExtension` API

7. Use the `onRender` prop in the `MoreBalanceInfo` component:

```jsx
const MoreBalanceInfo = ({ onRender, ...props }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    return onRender(ref.current, "balance-info", props);
  }, []);

  return <slot ref={ref} />;
};
```

8. Build the MF with Webpack (`npx webpack --mode production`) and then publish it using

```sh
npm pack
curl -F 'file=@./balance-1.0.0.tgz' http://localhost:9000/modules
rm *.tgz
```

where `localhost:9000` is the address of the feed server

