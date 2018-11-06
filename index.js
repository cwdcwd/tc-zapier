
const config = require('config');
const tcCoreLib = require('tc-core-library-js');
const zapier = require('zapier-platform-core');
const ProjectResource = require('./resources/project');

zapier.tools.env.inject();

const addAuthHeader = (request, z, bundle) => {
  const clientId = config.CLIENT_ID;
  const clientSecret = config.CLIENT_SECRET;
console.log(config);
  const m2m = tcCoreLib.auth.m2m({ AUTH0_URL: config.AUTH0_URL, AUTH0_AUDIENCE: config.AUTH0_AUDIENCE})
  return m2m.getMachineToken(clientId, clientSecret).then( (JWT) => {
    request.headers['authorization'] = `Bearer ${JWT}`;
    //console.log(request);
    return request;
  }).catch((err) => {
    console.log(err);
    return request;
  });

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
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {

  },

  // If you want your searches to show up, you better include it here!
  searches: {
//    [ProjectResource.key]: ProjectResource.search,
  },

  // If you want your creates to show up, you better include it here!
  creates: {}
};

// Finally, export the app.
module.exports = App;
