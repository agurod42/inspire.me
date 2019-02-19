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
    } catch (err) {
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
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err);
    }
  }

  /**
   * Returns people matching criteria `q`
   *
   * @param {string} q
   */
  async people(q) {
    try {
      const people = [];
      const res = await axios.get(`${this.apiUrl}/people?q=${q || ''}`);
      for (let i = 0; i < res.data.length; i++) {
        people.push((await axios.get(`${this.apiUrl}/bios/${res.data[i].publicId}`)).data);
      }
      return people;
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err);
    }
  }
};
