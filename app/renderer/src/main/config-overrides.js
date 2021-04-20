const {override} = require('customize-cra');
function addTarget(config){
  config.target = 'electron-renderer';
  return config;
}
module.exports = override(addTarget);