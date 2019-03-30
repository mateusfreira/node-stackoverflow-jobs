const rp = require('request-promise'),
    _ = require('lodash'),
    Promise = require("bluebird"),
    parseString = Promise.promisify(require('xml2js').parseString);

const StackoverflowJobs = function() {
    const itemToJob = function(item) {
        return {
            id: item.guid[0]._,
            link: item.link[0],
            category: item.category,
            title: item.title[0],
            description: item.description[0],
            pubDate: (item.pubDate ? new Date(item.pubDate[0]) : new Date()),
            location: item.location ? item.location[0]._ : ""
        };
    };
    const mapRssToJob = function(rss) {
        const channel = rss.channel[0];
        return {
            total: channel['os:totalResults'],
            description: channel.description,
            jobs: channel.item.map(itemToJob)
        };
    };
    const toQueryString = function(obj) {
        return _.map(obj, function(v, k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(v);
        }).join('&');
    };

    this.search = function(filters) {
        if (!filters.searchTerm) {
            filters.searchTerm = '';
        }
        return rp('http://careers.stackoverflow.com/jobs/feed?' + toQueryString(filters))
            .then(function(feedsString) {
                return parseString(feedsString);
            }).then(function(feedsObj) {
                return mapRssToJob(feedsObj.rss);
            });
    };

    this.allowsRemote = function(term) {
        return this.search({
            searchTerm: term,
            allowsremote: true
        });
    };
    this.searchTerm = function(term) {
        return this.search({
            searchTerm: term
        });
    };
};


module.exports = new StackoverflowJobs();
