'use strict';

const btc = require('../lib/btc');

module.exports = function(app) {
  app.get('/ok', (req, res) => {
    res.send('ok');
  });

  app.get('/test-db', (req, res, next) => next());
  app.get('/test-api', (req, res, next) => {
    btc.api((err, data) => {
      if (err) return next(err);
      return res.json(data);
    });
  });
};
