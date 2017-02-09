'use strict';
const assert = require('assert');
const request = require('supertest');
const expected = 2.0016306374;
const config = require('../config/default.json');

describe('Routing', () => {
  const url = ['http://', config.server.host, ':', config.server.port].join('');
  describe('Api test', () => {
    it(`should return ok`, done => {
      var data = {};

      request(url)
        .get('/test-api')
        .send(data)
        .expect(200, done);
    });
  });

  describe('Invoice', () => {
    it(`should calculate invoice`, done => {
      var data = {
        "orders": [{
          "currency": "EUR",
          "amount": 100.34
        }, {
          "currency": "USD",
          "amount": 60.00
        }]
      };

      request(url)
        .post('/invoice')
        .send(data)
        .expect(200, done);
    });
  });

});