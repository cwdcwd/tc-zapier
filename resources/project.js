
const config = require('config');

const baseURL = config.BASE_URL;

// get a single project
const getProject = (z, bundle) => {
  const responsePromise = z.request({
    url: `${baseURL}/${bundle.inputData.id}`,
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// get a list of projects
const listProjects = (z) => {
  const responsePromise = z.request({
    url: `${baseURL}`,
    params: {
      limit: '20',
      fields: 'id,name,description,members,status,type,actualPrice,estimatedPrice,createdAt,updatedAt,createdBy,updatedBy,details'
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// find a particular project by name
const searchProjects = (z, bundle) => {
  const responsePromise = z.request({
    url: `${baseURL}`,
    params: {
      limit: '20',
      fields: 'id,name,description,members,status,type,actualPrice,estimatedPrice,createdAt,updatedAt,createdBy,updatedBy,details',
      filter: `status%3Dactive%26keyword%3D${bundle.inputData.name}`,
      sort: 'updatedAt+desc'
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

/*
// create a project
const createProject = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: `${baseURL}`,
    body: {
      name: bundle.inputData.name // json by default
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};
*/
module.exports = {
  key: 'project',
  noun: 'Project',

  get: {
    display: {
      label: 'Get Project',
      description: 'Gets a project.'
    },
    operation: {
      inputFields: [
        {key: 'id', required: true}
      ],
      perform: getProject
    }
  },

  list: {
    display: {
      label: 'New Project',
      description: 'Lists the projects.'
    },
    operation: {
      perform: listProjects
    }
  },

  search: {
    display: {
      label: 'Find Project',
      description: 'Finds a project by searching.'
    },
    operation: {
      inputFields: [
        {key: 'name', required: true}
      ],
      perform: searchProjects
    },
  },
/*
  create: {
    display: {
      label: 'Create Project',
      description: 'Creates a new project.'
    },
    operation: {
      inputFields: [
        {key: 'name', required: true}
      ],
      perform: createProject
    },
  },
*/
  sample: {
    id: 1,
    name: 'Test'
  },

  outputFields: [
    {key: 'id', label: 'ID'},
    {key: 'name', label: 'Name'}
  ]
};
