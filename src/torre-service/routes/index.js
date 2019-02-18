/**
 * @name torre-v1-api
 * @description This module packages the Torre API.
 */
'use strict';

const express = require('hydra-express').getExpress();
const ServerResponse = require('fwsp-server-response');
const TorreServiceController = require('../controllers/torre-service');

const serverResponse = new ServerResponse();
express.response.sendError = function(err) {
  serverResponse.sendServerError(this, { result: { error: err }});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, { result });
};

let api = express.Router();
let controller = new TorreServiceController();

api.get('/bio', async (req, res) => {
  if (!req.query.username) {
    res.sendError('The username param is required');
    return;
  }

  res.sendOk(await controller.bio(req.query.username));
});

api.get('connections', (req, res) => {
  res.sendOk({ greeting: 'Welcome to Hydra Express!' });
});

api.get('/', (req, res) => {
  res.sendOk({ greeting: 'Welcome to Hydra Express!' });
});

module.exports = api;
