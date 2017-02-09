'use strict';

const request = require('request');
const config = require('config');
const Invoice = require('../models/invoice.js');

const parse = (btcdata, next) => {
  let data = {};
  try {
    data = JSON.parse(btcdata);
  } catch (e) {
    return next(e || new Error('Api error! #2'));
  }
  return next(null, data);
};

const btc = {
  api(next) {
    const apiUrl = config.get('btc.api');
    request.get(apiUrl, (err, res, body) => {
      if (err || !body) return next(err || new Error('Api error! #1'));
      return parse(body, next);
    });
  },
  calcInvoice(data, next) {
    return btc.api((err, btcData) => {
      if (err) return next(err);

      const invoice = new Invoice();
      data.orders.forEach((order) => {
        const currency = order.currency;
        const amount = order.amount;
        const btc = btcData[currency].last;

        const fees = config.get('btc.fee');
        const percentage = fees[amount >= 100 ? 'gte100' : 'lt100'];
        invoice.payment.fee += amount * percentage [currency] / 100;
        invoice.payment.amount += amount / btc;
      });
      invoice.payment.total = invoice.payment.fee + invoice.payment.amount;
      return next(null, invoice);
    });
  },
};

module.exports = btc;
