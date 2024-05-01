const { name } = require("./package.json");

module.exports = {
  entry: {
    [name]: "./src/index.jsx",
  },
  output: {
    filename: "index.js",
    library: name,
    path: __dirname + "/dist",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
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
};
