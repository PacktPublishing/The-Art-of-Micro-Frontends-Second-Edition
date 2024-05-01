module.exports = {
  entry: {
    "product-recommendations": "./src/product-recommendations.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    publicPath: "http://localhost:2003/",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
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
