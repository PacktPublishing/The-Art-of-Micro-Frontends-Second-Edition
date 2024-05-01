# Chapter 11

## Prerequisites

The following software is required to run the sample:

- Git
- Node.js
- NPM

## Running

Clone the repository:

```sh
git clone https://github.com/ArtOfMicrofrontends/11-frontend-tax.git
```

Go to the repository's directory and run NPM install:

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
npm install file-loader svelte svelte-loader webpack webpack-cli --save-dev
```

2. Add a *webpack.config.js* and make sure to target `library` (with the name of the package)

3. Copy over the balance sheet code from the previous sample

4. Change the `index.js` to export a `setup` function

```js
export function setup(api) {
  let Info = undefined;

  api.registerExtension("balance-info", {
    bootstrap: () =>
      import("./Info.svelte").then((content) => {
        Info = content.default;
      }),
    mount: (target, props) =>
      new Info({
        target,
        props,
      }),
    unmount: (_, info) => info.$destroy(),
  });
}
```

5. Build the MF with Webpack (`npx webpack --mode production`) and then publish it using

```sh
npm pack
curl -F 'file=@./tax-1.0.0.tgz' http://localhost:9000/modules
rm *.tgz
```

where `localhost:9000` is the address of the feed server
