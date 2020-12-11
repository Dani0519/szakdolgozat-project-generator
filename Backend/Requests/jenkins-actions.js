const config = require('../config');
const jenkins = require('jenkins')(config.jenkins);
const { auth } = require('../tools');

const disablePipeline = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }
  response.end();
  jenkins.job.disable(request.params.pipeline ,(err, data) => {
    if (err) {
      console.log(err);
      response.status(500);
      response.end();
    } else {
      response.end();
    }
  });
};

const enablePipeline = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }
  response.end();
  jenkins.job.enable(request.params.pipeline, (err, data) => {
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
  disablePipeline,
  enablePipeline
};