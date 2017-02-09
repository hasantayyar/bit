'use strict';
const assert = require('assert');
const request = require('supertest');
const expected = 2.0016306374;
const config = require('../config/default.json');

describe('Routing', () => {
  const url = ['http://', config.server.host, ':', config.server.port].join('');
  describe('Calc', () => {
    it(`should return ok`, done => {
      var data = {};

      request(url)
        .get('/')
        .send(data)
        .expect(200, done);
    });
  });
});