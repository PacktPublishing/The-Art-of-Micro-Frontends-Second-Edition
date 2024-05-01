# Chapter 05

## Prerequisites

The following software is required to run the sample:

- Git
- Node.js
- NPM

## Running

Clone the repository:

```sh
git clone https://github.com/ArtOfMicrofrontends/05-server-discover.git
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

1. Initialize the repository:

```sh
npm init -y
```

2. Make it a Lerna monorepo:

```sh
npx lerna init
```

3. Add an application gateway and two microfrontends:

```sh
npx lerna create @aom/app --yes
npx lerna create @aom/mife-1 --yes
npx lerna create @aom/mife-2 --yes
```

4. Register the dependencies:

```sh
npx lerna add express pug
```

5. Add `http-proxy` to the gateway:

```sh
npx lerna add http-proxy --scope @aom/app
```

6. Add Express to each app (`PORT` should be actually different per app):

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

8. Integrate the view engine per app.

```js
app.set('view engine', 'pug')
```

9. Add views such as `views/index.pug`:

```pug
html
  head
    title= title
  body
    h1= message
    p In microfrontend 1.
```

10. Call the views from the microfrontends. Here, we can keep the path relative:

```js
res.render('index', { title: "Sample", message: "MF1" });
```

11. To add assets we need to configure static file hosting:

```js
app.use("/mf2", express.static(path.join(__dirname, "..", "public")));
```

12. Run the application:

```sh
npx lerna run serve --stream
```
