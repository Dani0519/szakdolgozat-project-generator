const config = require('../config');
const jenkins = require('jenkins')(config.jenkins);
const { auth } = require('../tools');

const getData = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  jenkins.info((err, data) => {
    if (err) {
      console.log(err);
      response.status(500);
      response.end();
    } else {
      let result = {
        views: data.views.length,
        pipelines: data.jobs.length,
        execturos: data.numExecutors
      };
      response.send(result);
      response.end();
    }
  });
};


const getViews = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  jenkins.info(function (err, data) {
    if (err) {
      console.log(err);
      response.status(500);
      response.end();
    } else {
      const result = [];
      data.views.forEach(element => {
        const object = { name: element.name, url: element.url };
        result.push(object);
      });
      response.send(result);
      response.end();
    }
  });

};

const getPipelines = function  (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  jenkins.info(function (err, data) {
    if (err) {
      console.log(err);
      response.status(500);
      response.end();
    } else {
      const result = [];
      data.jobs.forEach(element => {
        const object = { name: element.name, url: element.url };
        result.push(object);
      });
      response.send(result);
      response.end();
    }
  });
};

const getPipeline = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  jenkins.job.get(request.params.pipeline, (err, data) => {
    if (err) {
      console.log(err);
      response.status(500);
      response.end();
    } else {
      response.send(data);
      response.end();
    }
  });
};

const getBuild = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  jenkins.build.get(request.params.pipeline, request.params.buildNumber, function (err, data) {
    if (err) {
      console.log(err);
      response.status(500);
      response.end();
    } else {
      response.send(data);
      response.end();
    }
  });
};

module.exports = {
  getData,
  getViews,
  getPipelines,
  getPipeline,
  getBuild
};