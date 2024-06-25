const { vanillaExtractPlugin } = require("@vanilla-extract/esbuild-plugin");

module.exports = function (options) {
  options.plugins.push(vanillaExtractPlugin());
  return options;
};
