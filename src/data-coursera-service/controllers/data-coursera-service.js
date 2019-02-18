const scrapeIt = require('scrape-it');

module.exports = class DataCourseraServiceController {

    constructor() {
        this.coursesPageUrl = 'https://en.coursera.org/courses';
    }

    /**
     * Returns the list of courses in Coursera 
     */
    async courses() {
        try {
            const res = await scrapeIt(`${this.coursesPageUrl}`, {
                courses: {
                    listItem: '.ais-InfiniteHits-item',
                    data: {
                        url: {
                            selector: '.rc-DesktopSearchCard',
                            attr: 'href'
                        },
                        title: '.card-title',
                        partnerName: '.partner-name',
                    }
                }
            });
            return res.data;
        }
        catch (err) {
            throw new Error(err.response ? err.response.data.message : err);
        }
    }

}