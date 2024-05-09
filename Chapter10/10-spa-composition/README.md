# Chapter 10

## Prerequisites

The following software is required to run the sample:

- Git
- Node.js
- npm
- Bash

## Running

Go to the current directory and start the application, which also installs all required package dependencies:

```sh
./run.sh
```

## Steps

Follow these steps to implement the same from scratch.

1. Start with the app shell, initialize a new Node.js project and install the dependencies

```sh
npm init -y
npm install bootstrap bootstrap-icons regenerator-runtime --save
npm install parcel-bundler --save-dev
```

2. Create an *index.html* file with the skeleton design of the application with a placeholder for the content (e.g., `#app-content`)

3. Add the script (*app.js*) and stylesheet (*style.css*) reference

4. In the script load all configured MF scripts coming from the *scripts.json*:

```json
[
    "/mfes/balance/balance.js",
    "/mfes/tax/tax.js",
    "/mfes/settings/settings.js"
]
```

with the loading logic being as simple as

```js
import("./scripts.json").then((scripts) =>
  scripts.forEach((url) => {
    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
  })
);
```

5. Hook on to the `hashchange` and `popstate` listeners to introduce routing

6. Introduce lifecycle functions for `bootrap`, `mount`, and `unmount` of components - hooked up in the `renderComponent` function:

```js
window.renderComponent = (name, componentName, target, props = {}) => {
  const id = makeId(name, componentName);
  const info = registry[id];

  if (info !== undefined) {
    const user = {
      target,
      props,
      data: undefined,
      state: "init",
    };
    info.used.push(user);
    info.wait = bootstrapComponent(info, user);
    info.wait = mountComponent(info, user);
  }
};
```

7. Create the MFs, e.g., for the `tax` MF you'll need to initialize and set up the project

```sh
npm init -y
npm install file-loader svelte svelte-loader webpack webpack-cli --save-dev
```

where you'll need to add a proper Webpack configuration for the framework of your choice

8. The *index.js* of each MF will have boilerplate code to register the lifecycle of the exposed components; for instance:

```js
window.registerComponent("<namespace-name>", "<component-name>", {
  bootstrap: () => {
    // load component
  },
  mount: (target, props) => {
    // mount component
  },
  unmount: (target, info) => {
    // unmount component
  },
});
```
