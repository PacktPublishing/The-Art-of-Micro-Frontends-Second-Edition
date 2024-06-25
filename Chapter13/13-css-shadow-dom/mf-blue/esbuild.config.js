module.exports = function(options) {
  options.loader['.css'] = 'text';
  options.plugins.splice(0, 1);
  return options;
};
