/*'use strict';
const winston = require('winston');
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => winston.log('error', 'Error ' + err));

module.exports = client;
*/
