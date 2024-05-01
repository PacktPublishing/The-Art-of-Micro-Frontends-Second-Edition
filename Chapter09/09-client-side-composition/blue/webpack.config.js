module.exports = {
  entry: {
    "basket-info": "./src/basket-info.js",
    "buy-button": "./src/buy-button.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    publicPath: "http://localhost:2002/",
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
