var rp = require('request-promise');
var _ = require('lodash');
var q = require('q');
var parseString = require('xml2js').parseString;

var StackoverflowJobs = function(){
  var itemToJob = function(item){
    return {
      id : item.guid[0]._,
      link : item.link[0],
      category: item.category,
      title: item.title[0],
      description: item.description[0],
      pubDate: (item.pubDate ? new Date(item.pubDate[0]) : new Date()),
      location : item.location ? item.location[0]._ : ""
    };
  };
  var mapRssToJob = function(rss){
    var channel = rss.channel[0];
    return {
            total : channel['os:totalResults'],
            description : channel.description,
            jobs : channel.item.map(itemToJob)
      };
  };
  var toQueryString = function(obj) {
    return _.map(obj,function(v,k){
      return encodeURIComponent(k) + '=' + encodeURIComponent(v);
    }).join('&');
  };
  this.search = function(filters){
    if(!filters.searchTerm){
        filters.searchTerm = "";
    }
    return rp('http://careers.stackoverflow.com/jobs/feed?'+toQueryString(filters)).then(function(result){
      var defer = q.defer();
      parseString(result, function(err, obj){
          if(!err){
            defer.resolve(mapRssToJob(obj.rss));
          }else{
              defer.reject(err);
          }
      });
      return defer.promise
    });
  };

  this.allowsRemote = function(term){
    return this.search({ searchTerm: term, allowsremote: true });
  };
  this.searchTerm = function(term){
      return this.search({ searchTerm: term});
  };
};


module.exports = new StackoverflowJobs();
