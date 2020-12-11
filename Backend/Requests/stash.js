const config = require('../config');
const https = require('https');
const { auth } = require('../tools');
const fs = require('fs');
const Stream = require('stream').Transform;

const getCommits = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  let endpoint = config.stash;
  endpoint.path = '/rest/api/1.0/projects/' + request.params.project + '/repos/' + request.params.repo + '/commits?limit=100';

  https.get(endpoint, function(resp) {
    let result = '';
    resp.on('data', data => {
      result += data;
    });
    resp.on('end', () => {
      response.send(JSON.parse(result).values);
      response.end();
    });
  });
};

const getTags = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  let endpoint = config.stash;
  endpoint.path = '/rest/api/1.0/projects/' + request.params.key + '/repos/' + request.params.project + '/tags?limit=100';

  https.get(endpoint, function(resp) {
    let result = '';
    resp.on('data', data => {
      result += data;
    });
    resp.on('end', () => {
      response.send(JSON.parse(result).values);
      response.end();
    });
  });
};

// dani

const getAvatar = function (request, response) {
  // try {
  //   auth(request.headers.key, request.app.keys);
  // } catch (err) {
  //   response.status(401);
  //   response.end();
  //   return;
  // }

  let endpoint = config.stash;
  endpoint.path = '/rest/api/1.0/projects/' + request.params.key + '/avatar.png';

  https.get(endpoint, function(resp) {
    let result = new Stream();

    resp.on('data', data => {
      result.push(data);
    });
    resp.on('end', () => {
      fs.writeFileSync('./Images/' + request.params.key + '.png', result.read());
      // response.sendFile('/Images/' + request.params.key + '.png');
      response.writeHead(200, {'Content-Type': 'image/png' });
      response.end(fs.readFileSync('./Images/' + request.params.key + '.png'), 'binary');
    });
  });
};

 const getBranches = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
    } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  let endpoint = config.stash;
  endpoint.path = '/rest/api/1.0/projects/' + request.params.key + '/repos/' + request.params.repo + '/branches';

  https.get(endpoint, function(resp) {
    let result = '';
    resp.on('data', data => {
      result += data;
    });
    resp.on('end', () => {
      response.send(JSON.parse(result).values);
      response.end();
    });
  });
};

const getJiraKeys = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
    } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  let endpoint = config.stash;
  endpoint.path = '/rest/api/1.0/projects?limit=100';

  https.get(endpoint, function(resp) {
    let result = '';
    resp.on('data', data => {
      result += data;
    });
    resp.on('end', () => {
      response.send(JSON.parse(result).values);
      response.end();
    });
  });
};

module.exports = {
  getCommits,
  getTags,
  getAvatar,
  getBranches,
  getJiraKeys
};