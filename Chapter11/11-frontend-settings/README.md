# Chapter 11

## Prerequisites

The following software is required to run the sample:

- Git
- Node.js
- NPM

## Running

Clone the repository:

```sh
git clone https://github.com/ArtOfMicrofrontends/11-frontend-settings.git
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
npm install vue --save
npm install @babel/core @babel/preset-env @babel/plugin-proposal-json-strings @babel/plugin-syntax-dynamic-import @babel/plugin-syntax-import-meta babel-loader css-loader vue-loader vue-template-compiler webpack webpack-cli --save-dev
```

2. Add a *webpack.config.js* and make sure to target `library` (with the name of the package)

3. Copy over the settings code from the previous sample

4. Change the `index.js` to export a `setup` function

```js
export function setup(api) {
  let SettingsPage = undefined;

  api.registerPage("/settings", {
    bootstrap: () =>
      import("./Settings.vue").then((content) => {
          SettingsPage = content.default;
      }),
    mount: (target) => new Vue({
      el: target.appendChild(document.createElement('div')),
      render(h) {
        return h(SettingsPage, {
          props: {},
        });
      },
    }),
    unmount: (_, instance) => instance.$destroy(),
  });
}
```

5. Build the MF with Webpack (`npx webpack --mode production`) and then publish it using

```sh
npm pack
curl -F 'file=@./settings-1.0.0.tgz' http://localhost:9000/modules
rm *.tgz
```

where `localhost:9000` is the address of the feed server
