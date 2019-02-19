const axios = require('axios').default;

module.exports = class InspirerServiceController {
  constructor(dataProviderServices) {
    this.dataProviderServices = dataProviderServices;
  }

  /**
     * Returns a list of books, courses and talks given a list of `subjects`.
     *
     * @param {string[]} subjects
     */
  async inspireMe(subjects) {
    const result = {};

    const ks = Object.keys(this.dataProviderServices);
    for (let i = 0; i < ks.length; i++) {
      const dataProviderService = this.dataProviderServices[ks[i]];
      for (let j = 0; j < subjects.length; j++) {
        try {
          if (subjects[j] && subjects[j].length) {
            const res = await axios.get(`http://${dataProviderService.ip}:${dataProviderService.port}/v1/data?subject=${subjects[j]}`);
            if (res.data.result.length) {
              result[ks[i]] = [...(result[ks[i]] || []), ...res.data.result];
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    return result;
  }
};
