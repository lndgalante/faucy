const wretch = require('wretch');
const fetch = require('node-fetch');

wretch().polyfills({ fetch });

module.exports = { wretch };
