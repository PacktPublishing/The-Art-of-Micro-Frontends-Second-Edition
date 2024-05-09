# Chapter 05

## Prerequisites

The following software is required to run the sample:

- Git
- Node.js
- npm

## Running

Go to the current directory and run npm install:

```sh
npm install
```

Now start the application:

```sh
npm start
```

## Steps

Follow these steps to implement the same from scratch.

1. Initialize the repository:

```sh
npm init -y
```

2. Make it a Lerna monorepo:

```sh
npx lerna init
```

3. Add an application shell:

```sh
npx lerna create @aom/app --yes
```

4. Add two micro frontends:

```sh
npx lerna create @aom/mife-1 --yes
npx lerna create @aom/mife-2 --yes
```

5. Register the dependencies in `@aom/app`:

```sh
npx lerna add @aom/mife-1 --scope @aom/app
npx lerna add @aom/mife-2 --scope @aom/app
npx lerna add express  --scope @aom/app
```

6. Add Express to the app:

```js
"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log(`Running at ${port}.`);
});
```

7. Add an index route for the app:

```js
app.get("/", (_, res) => {
  res.send("index page.");
});
```

8. Add an integration point in each micro frontend, e.g.,

```js
"use strict";

module.exports = mife1;

function mife1(app) {
  app.get("/mf1", (_, res) => {
    res.send("mf1");
  });
}
```

9. Integrate the micro frontend in the app:

```js
require('@aom/mife-1')(app);
```

10. Add a view engine (e.g., `pug`). First, install the dependency

```sh
npx lerna add pug
```

then set the engine in the app.

```js
app.set('view engine', 'pug')
```

11. Add views such as `views/index.pug`:

```pug
html
  head
    title= title
  body
    h1= message
    p In micro frontend 1.
```

12. Call the views from the micro frontends. Keep the path absolute:

```js
const page = require.resolve('../views/index.pug');
res.render(page, { title: "Sample", message: "MF1" });
```

13. To add assets we need to configure static file hosting:

```js
app.use("/mf2", express.static(path.join(__dirname, "..", "public")));
```
