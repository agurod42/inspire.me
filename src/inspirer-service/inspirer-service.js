/**
 * @name Inspirer
 * @summary Inspirer Hydra Express service entry point
 * @description
 */


const hydra = require('hydra');
const hydraExpress = require('hydra-express');


const config = require('fwsp-config');
const { version } = require('./package.json');

const dataProviderServices = [
  'data-coursera-service',
  'data-openlibrary-service',
  'data-ted-service',
];

/**
 * Load configuration file and initialize hydraExpress app
 */
(async function () {
  try {
    await config.init('./config/config.json');

    await hydra.init(config.getObject());

    const dataProviderInstances = {};
    dataProviderServices.forEach(async (name) => {
      if (await hydra.hasServicePresence(name)) {
        const [servicePresence] = await hydra.getServicePresence(name);
        dataProviderInstances[name] = servicePresence;
      }
    });

    const serviceInfo = await hydraExpress.init(config.getObject(), version, () => {
      hydraExpress.registerRoutes({
        '/v1': require('./routes')(dataProviderInstances),
      });
    });

    console.log('serviceInfo', serviceInfo);
  } catch (err) {
    console.log('err', err);
  }
}());
