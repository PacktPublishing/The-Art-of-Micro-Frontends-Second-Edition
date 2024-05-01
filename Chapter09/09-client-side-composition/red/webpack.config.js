module.exports = {
  entry: {
    "product-page": "./src/product-page.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    publicPath: "http://localhost:2001/",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader", options: { injectType: "linkTag" } },
          { loader: "file-loader" },
        ],
      },
    ],
  },
};
