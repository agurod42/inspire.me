const axios = require('axios').default;

module.exports = class TorreServiceController {

    /**
     * Returns the Torre Bio
     * @param {string} username 
     */
    async bio(username) {
        try {
            const res = await axios.get(`https://torre.bio/api/bios/${username}`);
            return res.data;
        }
        catch (err) {
            throw new Error(err.response ? err.response.data.message : err);
        }
    }

}