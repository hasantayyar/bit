'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Invoice = new Schema({
  payment: {
    currency: {
      type: String,
      default: 'BTC',
    },
    amount: {
      type: Number,
      min: 0,
      index: true,
      default: 0,
    },
    fee: {
      type: Number,
      min: 0,
      index: true,
      default: 0,
    },
    total: {
      type: Number,
      min: 0,
      index: true,
      default: 0,
    },
  },
});

module.exports = mongoose.model('Invoice', Invoice);
