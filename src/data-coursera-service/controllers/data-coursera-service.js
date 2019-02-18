const Fuse = require('fuse.js');
const xray = require('x-ray')();

module.exports = class DataCourseraServiceController {

    constructor() {
        this.coursesPageUrl = 'https://en.coursera.org/courses';
        this.fuse = new Fuse(require('../data/subjects.json'), {
            keys: ['name'],
            shouldSort: true,
            threshold: 0.7,
        });
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
            let mostSimilarSubject = this.fuse.search(subject, { limit: 1 });
            
            const queryParams = [
                'query=free courses',
                'indices[test_all_products][refinementList][language][0]=English',
                `indices[test_all_products][refinementList][skills][0]=${mostSimilarSubject[0].name}`
            ];
            const queryUrl = encodeURI(`${this.coursesPageUrl}?${queryParams.join('&')}`);

            const pageCountRes = await this.scrapCoursesNav(queryUrl);
            
            // If there is no paginator then there are no results
            if (!pageCountRes[pageCountRes.length - 2]) {
                return [];
            }

            const pageCount = pageCountRes[pageCountRes.length - 2].n;

            // Scrap no more than 10 pages at a time
            for (var i = 1; i <= Math.min(pageCount, 10); i++) {
                const partialQueryRes = await this.scrapCoursesPage(`${queryUrl}&indices[test_all_products][page]=${i}`);
                courses = courses.concat(partialQueryRes);
            }

            return courses;
        }
        catch (err) {
            throw new Error(err.response ? err.response.data.message : err);
        }
    }

    async scrapCoursesNav(queryUrl) {
        const s = '[aria-label="Pagination Controls"] ul li';
        const o = [{
            n: 'button',
        }];
        return await (xray(queryUrl, s, o).then(res => res).catch(console.log));
    }

    async scrapCoursesPage(queryUrl) {
        const s = '.ais-InfiniteHits-item';
        const o = [{
            url: '.rc-DesktopSearchCard@href',
            title: '.card-title',
            partnerName: '.partner-name',
            imageUrl: '.product-photo@src'
        }];
        return await (xray(queryUrl, s, o).then(res => res).catch(console.log));
    }

}