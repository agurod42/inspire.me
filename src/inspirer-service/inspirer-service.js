/**
* @name Inspirer
* @summary Inspirer Hydra Express service entry point
* @description 
*/
'use strict';

const version = require('./package.json').version;
const hydra = require('hydra');
const hydraExpress = require('hydra-express');


let config = require('fwsp-config');

const dataProviderServices = [
  'data-coursera-service',
  'data-openlibrary-service',
  'data-ted-service'
];

/**
* Load configuration file and initialize hydraExpress app
*/
(async function () {

  try {
    await config.init('./config/config.json');

    await hydra.init(config.getObject());

    var dataProviderInstances = {};
    dataProviderServices.forEach(async (name) => {
      if (await hydra.hasServicePresence(name)) {
        dataProviderInstances[name] = (await hydra.getServicePresence(name))[0];
      }
    });
    
    const serviceInfo = await hydraExpress.init(config.getObject(), version, () => {
      hydraExpress.registerRoutes({
        '/v1': require('./routes')(dataProviderInstances)
      });
    });

    console.log('serviceInfo', serviceInfo);
  }
  catch (err) {
    console.log('err', err);
  }

})();
