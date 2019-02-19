/**
* @name Data-openlibrary
* @summary Data-openlibrary Hydra Express service entry point
* @description
*/


const hydra = require('hydra');
const hydraExpress = require('hydra-express');


const config = require('fwsp-config');
const { version } = require('./package.json');

/**
* Load configuration file and initialize hydraExpress app
*/
config
  .init('./config/config.json')
  .then(() => {
    config.version = version;
    return hydraExpress.init(config.getObject(), version, () => {
      hydraExpress.registerRoutes({
        '/v1': require('./routes'),
      });
    });
  })
  .then((serviceInfo) => {
    const c = config.getObject();
    return hydra.init({ ...c, hydra: { ...c.hydra, ...serviceInfo } });
  })
  .then(() => hydra.registerService())
  .then((serviceInfo) => {
    console.log('serviceInfo', serviceInfo);
  })
  .catch(err => console.log('err', err));
