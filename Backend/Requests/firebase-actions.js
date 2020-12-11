const { auth } = require('../tools');
const admin = require('firebase-admin');
const db = admin.firestore();

const setPreVersion = function(request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  db.collection('Projects').doc(request.params.project).get().then((doc) => {
    if (doc.exists) {
      let project = doc.data();
      project.versions.pre = request.query.version;
      db.collection('Projects').doc(request.params.project).update({ versions: project.versions });
      response.end();
    } else {
      console.log(request.body.jobName + ' document not found in the deployments!');
      response.status(404);
      response.end()
    };
  });
};

const setStagingVersion = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  db.collection('Projects').doc(request.params.project).get().then((doc) => {
    if (doc.exists) {
      let project = doc.data();
      project.versions.staging = request.query.version;
      db.collection('Projects').doc(request.params.project).update({ versions: project.versions });
      response.end();
    } else {
      console.log(request.body.jobName + ' document not found in the deployments!');
      response.status(404);
      response.end()
    };
  });
};

const setProductionVersion = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  db.collection('Projects').doc(request.params.project).get().then((doc) => {
    if (doc.exists) {
      let project = doc.data();
      project.versions.production = request.query.version;
      db.collection('Projects').doc(request.params.project).update({ versions: project.versions });
      response.end();
    } else {
      console.log(request.body.jobName + ' document not found in the deployments!');
      response.status(404);
      response.end()
    };
  });
};

module.exports = {
  setPreVersion,
  setStagingVersion,
  setProductionVersion
};