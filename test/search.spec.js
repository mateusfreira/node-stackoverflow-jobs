const StackoverflowJobs = require('../index.js');
const assert = require('assert');
describe('StackoverflowJobs', function() {
    this.timeout(50000);
    it(' search should return an object', async () => {
        const result = await StackoverflowJobs.searchTerm("node");
        assert.equal('object', typeof result);
    });

    it('search should return the values total, description, jobs ', async () => {
        const result = await StackoverflowJobs.searchTerm("node");
        assert.notEqual(undefined, result.total);
        assert.notEqual(undefined, result.description);
        assert.notEqual(undefined, result.jobs);
    });
    it('search should allow empty search parameter ', async () => {
        const result = await StackoverflowJobs.searchTerm();
        assert.notEqual(undefined, result.total);
        assert.notEqual(undefined, result.description);
        assert.notEqual(undefined, result.jobs);
    });

    it('jobs should return the fields link, category, title, description, pubDate, location on allowsremote', async () => {
        const result = await StackoverflowJobs.allowsRemote("node");
        assert.notEqual(undefined, result.jobs[0].link);
        assert.notEqual(undefined, result.jobs[0].category);
        assert.notEqual(undefined, result.jobs[0].title);
        assert.notEqual(undefined, result.jobs[0].description);
        assert.notEqual(undefined, result.jobs[0].pubDate);
        assert.notEqual(undefined, result.jobs[0].location);
    });

    it('jobs should return the fields link, category, title, description, pubDate, location', async () => {
        const result = await StackoverflowJobs.searchTerm("node");
        assert.notEqual(undefined, result.jobs[0].link);
        assert.notEqual(undefined, result.jobs[0].category);
        assert.notEqual(undefined, result.jobs[0].title);
        assert.notEqual(undefined, result.jobs[0].description);
        assert.notEqual(undefined, result.jobs[0].pubDate);
        assert.notEqual(undefined, result.jobs[0].location);
    });
});
