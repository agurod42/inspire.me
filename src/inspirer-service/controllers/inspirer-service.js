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
        let result = [];

        const ks = Object.keys(this.dataProviderServices);
        for (let i = 0; i < ks.length; i++) {
            const dataProviderService = this.dataProviderServices[ks[i]];
            for (var j = 0; j < subjects.length; j++) {
                try {
                    const res = await axios.get(`http://${dataProviderService.ip}:${dataProviderService.port}/v1/data?subject=${subjects[j]}`);
                    if (res.data.result.length) {
                        result = [...result, ...res.data.result];
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        };

        return result;
    }

}