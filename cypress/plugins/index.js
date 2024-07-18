const { preprocessor } = require('@cypress/typescript');

module.exports = (on, config) => {
  on('file:preprocessor', preprocessor());
  return config;
};