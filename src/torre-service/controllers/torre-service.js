const axios = require('axios').default;

module.exports = class TorreServiceController {

    /**
     * Returns the Torre Bio
     * @param {string} username 
     */
    async bio(username) {
        const res = await axios.get(`https://torre.bio/api/bios/${username}`);
        console.log(res);
        return res.data;
    }

}