const axios = require('axios').default;
const { snakeCase } = require('change-case');

module.exports = class DataOpenLibraryServiceController {
  /**
   * Returns the list of books given a `subject`.
   *
   * @param {string} subject
   */
  async books(subject) {
    try {
      const res = await axios.get(`http://openlibrary.org/subjects/${snakeCase(subject)}.json`);
      return res.data.works;
    } catch (err) {
      throw new Error(err.response ? err.response.data : err);
    }
  }
};
