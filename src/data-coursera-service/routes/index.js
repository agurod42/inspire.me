/**
 * @name data-coursera-v1-api
 * @description This module packages the Data-coursera API.
 */
'use strict';

const express = require('hydra-express').getExpress();
const ServerResponse = require('fwsp-server-response');
const DataCourseraServiceController = require('../controllers/data-coursera-service');

const serverResponse = new ServerResponse();
express.response.sendError = function(err) {
  serverResponse.sendServerError(this, { result: { error: err }});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, { result });
};

let api = express.Router();
let controller = new DataCourseraServiceController();

api.get('/data', async (req, res) => {
  if (!req.query.subject) {
    res.sendError('The subject param is required');
    return;
  }
  
  try {
    res.sendOk(await controller.courses((req.query.subject || '').split(',')));
  }
  catch (err) {
    res.sendError(err.message);
  }
});

module.exports = api;
