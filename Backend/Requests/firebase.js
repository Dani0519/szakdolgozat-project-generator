const { auth } = require('../tools');
const admin = require('firebase-admin');
const db = admin.firestore();

const uploadProject = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  let project = request.body;

  db.collection('Projects').doc(project.name).get().then((document => {
    if (document.exists) {
      const data = document.data();
      project['versions'] = data.versions;
      db.collection('Projects').doc(project.name).set(project);
    } else {
      project["versions"] = { pre: "", staging: "", production: "" };
      db.collection('Projects').doc(project.name).set(project);
    }
    response.end();
  }));

};

const getProject = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  const projectsRef = db.collection('Projects').doc(request.params.project);
  projectsRef.get().then(doc => {
    if (!doc.exists) {
      console.log(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString() + ':\tDocument does not exists!');
      response.status(404);
      response.send('The document does not exists!');
      response.end();
    }
    response.send(doc.data());
    response.end();
  }).catch((err) => {
    console.log(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString() + ':\tSomething bad happened!');
    console.log(err);
    response.status(500);
    response.end();
  });

};

const getIntegratedProjects = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  db.collection('Projects').get().then(function (snapshot) {
    let projects = new Array();
    snapshot.forEach(function (doc) {
      projects.push(doc.data());
    });
    response.send(projects);
    response.end();
  });
};

const uploadDeployResutls = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  let deployResult = request.body;
  var deploymentsRef = db.collection('Deployments').doc(request.body.jobName);

  deploymentsRef.get().then(function (doc) {
    if (doc.exists) {
      let data = doc.data();
      data.deployments.push(deployResult);
      db.collection('Deployments').doc(deployResult.jobName).set(data);
    } else {
      let deploymentsArray = new Array();
      deploymentsArray.push(deployResult);
      db.collection('Deployments').doc(deployResult.jobName).set({ deployments: deploymentsArray });
    }
  });
  response.end();
};

const uploadE2eResults = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  let e2eResult = request.body;
  let e2eRef = db.collection('Deployments').doc(request.params.jobName);

  e2eRef.get().then(function (doc) {
    if (!doc.exists) {
      let data = {
        deployments: new Array(),
        e2e: e2eResult
      };
      db.collection('Deployments').doc(request.params.jobName).set(data);
    } else {
      let data = doc.data();
      data.e2e = e2eResult;
      db.collection('Deployments').doc(request.params.jobName).set(data);
    }
  });
  response.end();
};

const getDeployments = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }


  let deploymetsRef = db.collection('Deployments').doc(request.params.jobName);
  deploymetsRef.get().then(function (doc) {
    if (doc.exists) {
      response.send(doc.data());
      response.end();
    } else {
      console.log(request.body.jobName + ' document not found in the deployments!');
      response.status(404);
      response.end()
    };
  });
};

const getRegisteredUsers = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  admin.auth().listUsers(100).then(function(listResult) {
    response.send(listResult.users);
    response.end();
  });
};

const registerUser = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  userData = request.body;

  admin.auth().createUser(userData).catch(err => {
    console.log(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString() + ':\tFailed to create user!');
    console.log(err);
    response.status(500);
    response.end();
  });

  response.end();
};

const deleteUser = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }
  
  admin.auth().deleteUser(request.params.id).catch(err => {
    console.log(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString() + ':\tFailed to delete user!');
    console.log(err);
    response.status(500);
    response.end();
  });
  response.end();
};

const getPullRequests = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  db.collection('PullRequests').doc(request.params.project).get().then(docRef => {
    response.send(docRef.data());
    response.end();
  });
  
}


module.exports = {
  getProject,
  uploadProject,
  getIntegratedProjects,
  uploadDeployResutls,
  uploadE2eResults,
  getDeployments,

  getRegisteredUsers,
  registerUser,
  deleteUser,

  getPullRequests
};