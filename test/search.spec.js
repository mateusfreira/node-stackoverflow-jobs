describe('StackoverflowJobs', function(){
  var StackoverflowJobs = require('../index.js');
  var assert = require('assert');
  it(' search should return an object', function (done) {
      StackoverflowJobs.searchTerm("node").then(function(result){
      assert.equal('object', typeof result);
      done();
    });
  });

  it('search should return the values total, description, jobs ', function (done) {
      StackoverflowJobs.searchTerm("node").then(function(result){
      assert.notEqual(undefined, result.total);
      assert.notEqual(undefined, result.description);
      assert.notEqual(undefined, result.jobs);
      done();
    });
  });
  it('search should allow empty search parameter ', function (done) {
       this.timeout(50000);
      StackoverflowJobs.searchTerm().then(function(result){
      assert.notEqual(undefined, result.total);
      assert.notEqual(undefined, result.description);
      assert.notEqual(undefined, result.jobs);
      done();
    });
  });


    it('jobs should return the fields link, category, title, description, pubDate, location on allowsremote', function (done) {
        this.timeout(50000);
        StackoverflowJobs.allowsRemote("node").then(function(result){
        assert.notEqual(undefined, result.jobs[0].link);
        assert.notEqual(undefined, result.jobs[0].category);
        assert.notEqual(undefined, result.jobs[0].title);
        assert.notEqual(undefined, result.jobs[0].description);
        assert.notEqual(undefined, result.jobs[0].pubDate);
        assert.notEqual(undefined, result.jobs[0].location);
        done();
      });
    });
  it('jobs should return the fields link, category, title, description, pubDate, location', function (done) {
      StackoverflowJobs.searchTerm("node").then(function(result){
      assert.notEqual(undefined, result.jobs[0].link);
      assert.notEqual(undefined, result.jobs[0].category);
      assert.notEqual(undefined, result.jobs[0].title);
      assert.notEqual(undefined, result.jobs[0].description);
      assert.notEqual(undefined, result.jobs[0].pubDate);
      assert.notEqual(undefined, result.jobs[0].location);
      done();
    });
  });
});
