/* globals describe it */
const should = require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Topcoder Projects', () => {
  it('should run resources.project', done => {
    let bundle = { inputData: {} };

    appTester(App.resources.project.list.operation.perform, bundle)
      .then(results => {
        should.exist(results);
        done();
      })
      .catch(done);
  });

  it('should get a resources.project', done => {
    bundle = { inputData: { id: App.resources.project.sample.id} };
    appTester(App.resources.project.get.operation.perform, bundle)
      .then(results => {
        should.exist(results);
        done();
      })
      .catch(done);
  });
});
