'use strict';

module.exports = function(app) {
  app.get('/ok', (req, res) => {
    res.send('ok');
  });

  app.get('/test-db', (req, res, next) => next());
};
