const axios = require('axios').default;

module.exports = class TorreServiceController {

    constructor() {
        this.apiUrl = 'https://torre.bio/api';
    }

    /**
     * Returns the Torre Bio
     * 
     * @param {string} username 
     */
    async bio(username) {
        try {
            const res = await axios.get(`${this.apiUrl}/bios/${username}`);
            return res.data;
        }
        catch (err) {
            throw new Error(err.response ? err.response.data.message : err);
        }
    }

    /**
     * Returns the connections of a Torre Bio 
     * 
     * @param {string} username 
     */
    async connections(username) {
        try {
            const res = await axios.get(`${this.apiUrl}/people/${username}/connections`);
            return res.data;
        }
        catch (err) {
            throw new Error(err.response ? err.response.data.message : err);
        }
    }

}