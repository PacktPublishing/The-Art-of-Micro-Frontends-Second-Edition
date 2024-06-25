const cssModulesPlugin = require('esbuild-css-modules-plugin');

module.exports = function(options) {
  options.plugins.splice(0, 1, cssModulesPlugin());
  return options;
};
