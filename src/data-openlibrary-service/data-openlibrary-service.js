/**
* @name Data-openlibrary
* @summary Data-openlibrary Hydra Express service entry point
* @description 
*/
'use strict';

const version = require('./package.json').version;
const hydra = require('hydra');
const hydraExpress = require('hydra-express');



let config = require('fwsp-config');

/**
* Load configuration file and initialize hydraExpress app
*/
config
  .init('./config/config.json')
  .then(() => {
    config.version = version;
    return hydraExpress.init(config.getObject(), version, () => {
      hydraExpress.registerRoutes({
        '/v1': require('./routes')
      });
    });
  })
  .then(serviceInfo => {
    const c = config.getObject();
    return hydra.init({ ...c, hydra: { ...c.hydra, ...serviceInfo } });
  })
  .then(() => {
    return hydra.registerService();
  })
  .then(serviceInfo => {
    console.log('serviceInfo', serviceInfo);
  })
  .catch(err => console.log('err', err));
