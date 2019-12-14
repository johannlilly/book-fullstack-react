var getBabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../src/data/schema.json');

module.exports = getBabelRelayPlugin(schema.data, {
  debug: true,
  suppressWarnings: false,
  enforceSchema: true
});
