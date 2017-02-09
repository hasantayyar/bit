'use strict';

const config = require('config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const winston = require('winston');
const errorHandler = require('../lib/errorHandler');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bitwala');

const app = express();

app.use(errorHandler);
app.use(bodyParser.json());
app.use(cors());
require('../routes')(app);

const PORT = config.get('server.port');

app.listen(PORT, () => {
  winston.log('info', `Server listening on port ${PORT}!`);
  winston.log('info', 'Press CTRL-C to stop\n');
});
