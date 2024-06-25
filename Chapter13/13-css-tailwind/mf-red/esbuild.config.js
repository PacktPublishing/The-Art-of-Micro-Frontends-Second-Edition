const postCssPlugin = require("esbuild-style-plugin");

module.exports = function (options) {
  options.plugins.splice(
    0,
    1,
    postCssPlugin({
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    })
  );
  return options;
};
