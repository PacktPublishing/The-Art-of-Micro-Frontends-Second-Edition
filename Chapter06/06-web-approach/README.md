# Chapter 06

## Prerequisites

The following software is required to run the sample:

- Git
- Node.js
- npm
- Bash

## Running

Go to the current directory and run npm install in each subdirectory:

```sh
cd mf-1
npm install
cd ..

cd mf-2
npm install
cd ..

cd mf-gw
npm install
cd ..
```

Now start the application:

```sh
./run.sh
```

## Steps

Follow these steps to implement the same from scratch.

1. Create the micro frontends

```sh
mkdir mf-1 && cd mf-1 && npm init -y && cd ..
mkdir mf-2 && cd mf-2 && npm init -y && cd ..
```

2. Add dependencies to run the views

```sh
cd mf-1 && npm i http-server --save-dev && cd ..
cd mf-2 && npm i http-server --save-dev && cd ..
```

3. Add script to start the local server, e.g., in the *package.json* of `mf-1`

```json
{
    // ...
    "scripts": {
        "start": "http-server ./views --port 2001",
        // ...
    }
}
```

4. Write some *index.html* in `mf-1/views/mf1` and `mf-2/views/mf2`. The content can be as simple as:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MF-1</title>
</head>
<body>
<h1>This is micro frontend 1.</h1>
<a href="/mf2">Go to MF2</a>
</body>
</html>
```

5. Add a gateway service:

```sh
mkdir mf-gw && cd mf-gw && npm init -y && cd ..
cd mf-gw && npm i http-proxy-middleware express --save && cd ..
```

6. Define the gateway, which can be as simple as:

```js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = process.env.PORT || 1234;

const targets = {
  "/mf1": "http://localhost:2001/mf1",
  "/mf2": "http://localhost:2002/mf2",
};

app.get("/", (_, res) => res.redirect(Object.keys(targets)[0]));

Object.keys(targets).forEach((prefix) => {
  app.use(
    prefix,
    createProxyMiddleware({
      target: targets[prefix],
      changeOrigin: true,
    })
  );
});

app.get("*", (_, res) => res.status(404).send("Page not found."));

app.listen(port, () => {
  console.log(`Micro Frontend gateway running at ${port}.`);
});
```

7. Add code to run all micro frontends and the gateway.

```sh
echo "#!/bin/bash" > run.sh
echo "(trap 'kill 0' SIGINT; (cd mf-gw && npm start) & (cd mf-1 && npm start) & (cd mf-2 && npm start))" >> run.sh
chmod +x run.sh
```

8. Run the solution

```sh
./run.sh
```

9. Play around with assets, links, and fragments.

10. Add a linking directory to the gateway.
