'use strict';

const btc = require('../lib/btc.js');
const winston = require('winston');
const invoice = require('../models/invoice.js');

module.exports = (app) => {
  app.post('/invoice', (req, res, next) => {
    const postData = req.body;
    winston.log('info', postData);

    if (!postData.orders || !postData.orders.length) {
      return res.json(204, {});
    }

    return btc.calcInvoice(postData, (err, invoice) => {
      if (err) return next(err);
      return invoice.save((err) => {
        if (err) return next(err);
        return res.json(invoice);
      });
    });
  });

  app.get(/\/invoice\/[0-9a-fA-F]{24}$/, (req, res, next) => {
    invoice.findOne(req.params[0], (err, data) => {
      if (err) return next(err); // header will be 404 automatically
      return res.json(data);
    });
  });
};
