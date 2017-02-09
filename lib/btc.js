'use strict';

const request = require('request');
const config = require('config');
const winston = require('winston');
const cache = require('../lib/redis');

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
  api: (next) => {
    const apiUrl = config.get('btc.api');
    request.get(apiUrl, (err, res, body) => {
      if (err || !body) return next(err || new Error('Api error! #1'));
      parse(body, next);
    });
  },
  calcInvoice: (data, next) => {
    return btc.api((err, btcData) => {
      if (err) return next(err);
      let payment = {
        currency: 'BTC',
        amount: 0,
        fee: 0,
        total: 0,
      };
      data.orders.forEach((order) => {
        let currency = order.currency;
        let amount = order.amount;
        let btc = btcData[currency].last;

        const fees = config.get('btc.fee');
        let feePercentage = fees[amount >= 100 ? 'gte100' : 'lt100'][currency];
        payment.fee += amount * feePercentage / 100;
        payment.amount += amount / btc;
      });
      payment.total = payment.fee + payment.amount;
      return next(null, payment);
    });

  }
};

module.exports = btc;