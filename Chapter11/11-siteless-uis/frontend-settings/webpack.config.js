const { name } = require("./package.json");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: {
    [name]: "./src/index.js",
  },
  output: {
    filename: "index.js",
    library: name,
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
