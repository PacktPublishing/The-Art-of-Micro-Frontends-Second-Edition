const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: {
    settings: "./src/index.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(vue)$/,
        exclude: /node_modules/,
        use: ["vue-loader"],
      },
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
  plugins: [
    new VueLoaderPlugin(),
  ],
};
