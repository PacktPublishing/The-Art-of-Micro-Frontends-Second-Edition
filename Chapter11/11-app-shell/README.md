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

1. Initialize a new Node.js project and install the dependencies

```sh
npm init -y
npm install bootstrap bootstrap-icons regenerator-runtime --save
npm install parcel-bundler cssnano --save-dev
```

2. Reuse the HTML template from the example written in chapter 10 (SPA composition), no changes needed

3. Most of the *app.js* from the previous example is still valid, but you'll need to modify the fetching of the MFs:

```js
fetch(feedUrl)
  .then((res) => res.json())
  .then((modules) =>
    modules.forEach((moduleData) => {
      const script = document.createElement("script");
      script.src = moduleData.link;
      script.onload = () => {
        const nsName = moduleData.name;
        const { setup } = window[nsName] || {};

        if (typeof setup === "function") {
          const api = createApi(nsName);
          setup(api);
        }
      };
      document.body.appendChild(script);
    })
  );
```

4. Add a `createApi` function for creating an API for each MF
