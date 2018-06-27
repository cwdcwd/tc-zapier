
const tc-core-library-js = require('tc-core-library-js');
const ProjectResource = require('./resources/project');

const addAuthHeader = (request, z, bundle) => {
  // Hard-coded authentication just for demo
  request.headers['X-API-Key'] = 'secret';
  return request;

  tc-core-library-js
};

// Now we can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  beforeRequest: [addAuthHeader],

  afterResponse: [],

  // If you want your resource to show up, you better include it here!
  resources: {
    [ProjectResource.key]: ProjectResource,
    [Projects.key]: Projects
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {},

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {}
};

// Finally, export the app.
module.exports = App;
