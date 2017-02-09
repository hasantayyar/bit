'use strict';

const btc = require('../lib/btc.js');
const winston = require('winston');
const config = require('config');

module.exports = function(app) {
  app.post('/invoice', (req, res, next) => {
    const postData = req.body;
    winston.log('info', postData);

    if (!postData.orders || !postData.orders.length) {
      return res.json(204, {});
    }

    return btc.calcInvoice(postData, (err, payment) => {
      if (err) return next(err);
      return res.json(payment);
    });
  });
};