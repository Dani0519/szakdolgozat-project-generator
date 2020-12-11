const { auth } = require('../tools');
const config = require('../config');
const jenkins = require('jenkins')(config.jenkins);

const preRollback = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  jenkins.job.build({ name: request.params.project, parameters: { version: "", mode: 'pre', checkout: request.body.checkout, who: request.body.author, message: request.body.message }}, (err, data) => {
    if (err) {
      console.log(err);
      response.status(500);
      response.end();
    } else {
      response.end();
    }
  });
};

const stagingRollback = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  jenkins.job.build({ name: request.params.project, parameters: { version: request.body.version, mode: 'staging', checkout: request.body.checkout, who: request.body.author, message: request.body.message }}, (err, data) => {
    if (err) {
      console.log(err);
      response.status(500);
      response.end();
    } else {
      response.end();
    }
  });
};

const productionRollback = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  jenkins.job.build({ name: request.params.project, parameters: { version: request.body.version, mode: 'production', checkout: request.body.checkout, who: request.body.author, message: request.body.message }}, (err, data) => {
    if (err) {
      console.log(err);
      response.status(500);
      response.end();
    } else {
      response.end();
    }
  });
};

module.exports = {
  preRollback,
  stagingRollback,
  productionRollback
};