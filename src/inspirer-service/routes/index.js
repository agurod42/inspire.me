/**
 * @name inspirer-v1-api
 * @description This module packages the Inspirer API.
 */
'use strict';

const express = require('hydra-express').getExpress();
const ServerResponse = require('fwsp-server-response');
const InspirerController = require('../controllers/inspirer-service');

const serverResponse = new ServerResponse();
express.response.sendError = function(err) {
  serverResponse.sendServerError(this, { result: { error: err }});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, { result });
};

module.exports = (dataProviderServices) => {

  let api = express.Router();
  let controller = new InspirerController(dataProviderServices);

  api.get('/inspire-me', async (req, res) => {
    if (!req.query.subjects) {
      res.sendError('The subjects param is required');
      return;
    }

    try {
      res.sendOk(await controller.inspireMe(req.query.subjects.split(',')));
    }
    catch (err) {
      res.sendError(err.message);
    }
  });

  return api;

};