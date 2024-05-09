# Chapter 09

## Prerequisites

The following software is required to run the sample:

- Git
- Node.js
- npm
- Bash

## Running

Go to the current directory and start the application, which installs also all dependencies:

```sh
./run.sh
```

## Steps

Follow these steps to implement the same from scratch.

1. Start with the app shell, create a new directory for it and run

```sh
npm init -y
```

2. Install the dependencies

```sh
npm i http-server --save-dev
```

3. Create some static resources such as an *index.html* and a *style.css* file in a new `public` folder, most importantly reference the MFs via their custom components and script source:

```html
<product-page id="app"></product-page>
<script src="http://localhost:2001/product-page.js"></script>
```

4. Run the HTTP server, e.g., `http-server ./public --port 1234`

5. Now create the MFs, e.g., the red micro frontend

6. Create a directory for each micro frontend, initializing it as a new Node.js project:

```sh
npm init -y
```

7. Install the dependencies, mostly for development:

```sh
npm i file-loader http-server style-loader webpack webpack-cli webpack-dev-server --save-dev
```

8. Create a *webpack.config.js* as shown - keep in mind that the public path should be set to the path of the server exposing the micro frontend (e.g., `http://localhost:2001/` for red)

9. Write the MFs in form of custom web components such as

```js
// reference resources by importing them
import "./style.css";
import image from "./image.jpg";

class MyComponent extends HTMLElement {
  constructor() {
    super();
    // initial rendering below
    this.innerHTML = ``;
  }

  static get observedAttributes() {
    // mark which attribute(s) to observe
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // react to changes
  }
}

customElements.define("my-component", MyComponent);
```

10. Build the MF using Webpack

```sh
npx webpack --mode production
```

11. For debugging purposes you could just run a simple HTTP server to expose the MF

```sh
npx http-server dist --port 2001
```
