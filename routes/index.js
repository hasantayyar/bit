'use strict';

module.exports = function(app) {
  require('./ok')(app);
  require('./btc')(app);
};
