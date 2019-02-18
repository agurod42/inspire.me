const scrapeIt = require('scrape-it');

module.exports = class DataCourseraServiceController {

    constructor() {
        this.coursesPageUrl = 'https://en.coursera.org/courses';
    }

    /**
     * Returns the list of courses in Coursera related to a subject.
     * 
     * @param {string} subject.
     *  
     * @todo: This implementation should change to use the official Coursera API. Currently
     * the scrapping method is being used because of the Afilliate Program requirement 
     * (See https://building.coursera.org/developer-program)
     */
    async courses(subject) {
        try {
            let courses = [];

            const queryParams = [
                'query=free courses',
                'indices[test_all_products][refinementList][language][0]=English',
                `indices[test_all_products][refinementList][skills][0]=${subject}`
            ];
            const queryUrl = encodeURI(`${this.coursesPageUrl}?${queryParams.join('&')}`);

            const pageCountRes = await scrapeIt(queryUrl, { 
                nav: { 
                    listItem: '[aria-label="Pagination Controls"] ul li', data: { n: 'button' } 
                } 
            });

            // If there is no paginator then there are no results
            if (!pageCountRes.data.nav[pageCountRes.data.nav.length - 2]) {
                return [];
            }

            const pageCount = pageCountRes.data.nav[pageCountRes.data.nav.length - 2].n;

            // Scrap no more than 10 pages at a time
            for (var i = 1; i <= Math.min(pageCount, 10); i++) {
                const partialQueryRes = await scrapeIt(`${queryUrl}&indices[test_all_products][page]=${i}`, {
                    courses: {
                        listItem: '.ais-InfiniteHits-item',
                        data: {
                            url: {
                                selector: '.rc-DesktopSearchCard',
                                attr: 'href',
                                convert: (v) => `https://en.coursera.org/courses${v}`
                            },
                            title: '.card-title',
                            partnerName: '.partner-name',
                        }
                    }
                });
                courses = courses.concat(partialQueryRes.data.courses);
            }

            return courses;
        }
        catch (err) {
            throw new Error(err.response ? err.response.data.message : err);
        }
    }

}