'use strict';

const btc = require('../lib/btc.js');

module.exports = function(app) {
  require('./ok')(app);
  require('./btc')(app);

  app.get('/test-api', (req, res, next) => {
    btc(function(err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });
};