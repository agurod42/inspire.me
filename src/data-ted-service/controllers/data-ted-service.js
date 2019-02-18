const axios = require('axios').default;

module.exports = class DataTedServiceController {

    constructor() {
        this.apiUrl = 'https://bestapi-ted-v1.p.rapidapi.com';
    }

    /**
     * Returns the list of TED talks given a `subject`.
     * 
     * @param {string} subject
     */
    async talks(subject) {
        try {
            const res = await axios.get(`${this.apiUrl}/talksByDescription?description=${subject}`, { headers: { 'X-RapidAPI-Key': process.env.DATA_TED_API_KEY } });
            return res.data;
        }
        catch (err) {
            throw new Error(err.response ? err.response.data : err);
        }
    }

}