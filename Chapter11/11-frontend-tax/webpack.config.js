const { name } = require("./package.json");
const { resolve } = require("path");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  entry: {
    [name]: "./src/index.js",
  },
  mode,
  output: {
    filename: "index.js",
    library: name,
    path: __dirname + "/dist",
  },
  devtool: prod ? false : "source-map",
  resolve: {
    // see below for an explanation
    alias: {
      svelte: resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: "svelte-loader",
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: ["file-loader"],
      },
      {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
};
