Stackoverflow Jobs
=============

Stackoverflow Jobs rss wrapper purely written in Node.js


## Getting Started

Wrapper can be downloaded from npm:

`npm install stackoverflow-jobs --save`

Once installed, its easy to use it:

```javascript
var stackoverflowJobs = require('stackoverflow-jobs');
```

## Search for terms

```javascript
stackoverflowJobs.searchTerm('node').then(function(result){
      result.jobs; // array with Jobs.
      result.total; // Number of results
  }).catch(function(error){

  });
```


## Generic searchs
You just need to pass the search parameter for the method
```javascript
stackoverflowJobs.search({allowsremote : true, offersrelocation: true, location: "USA" }).then(function(result){
      result.jobs; // array with Jobs.
      result.total; // Number of results
  }).catch(function(error){

  });
```

## Jobs Object are like e.g:
```javascript
{
  id: 'an string id of object',
  link: 'link to the job',
  category: [ 'an string array of categories'],
  title: 'Title job',
  description: '<b>HTML description of job</b>',
  pubDate: 'Tue, 08 Dec 2015 22:20:20 Z',//an date Object
  location:'location as string'
}
```
