/**
 * @name torre-v1-api
 * @description This module packages the Torre API.
 */


const express = require('hydra-express').getExpress();
const ServerResponse = require('fwsp-server-response');
const TorreServiceController = require('../controllers/torre-service');

const serverResponse = new ServerResponse();
express.response.sendError = function (err) {
  serverResponse.sendServerError(this, { result: { error: err } });
};
express.response.sendOk = function (result) {
  serverResponse.sendOk(this, { result });
};

const api = express.Router();
const controller = new TorreServiceController();

api.get('/bio', async (req, res) => {
  if (!req.query.username) {
    res.sendError('The username param is required');
    return;
  }

  try {
    res.sendOk(await controller.bio(req.query.username));
  } catch (err) {
    res.sendError(err.message);
  }
});

api.get('/connections', async (req, res) => {
  if (!req.query.username) {
    res.sendError('The username param is required');
    return;
  }

  try {
    res.sendOk(await controller.connections(req.query.username));
  } catch (err) {
    res.sendError(err.message);
  }
});

api.get('/people', async (req, res) => {
  if (!req.query.q) {
    res.sendError('The q param is required');
    return;
  }

  try {
    res.sendOk(await controller.people(req.query.q));
  } catch (err) {
    res.sendError(err.message);
  }
});

module.exports = api;
