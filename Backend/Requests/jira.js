const config = require('../config');
const https = require('https');
const { auth } = require('../tools');
const request = require('request');
const fs = require('fs');
const Stream = require('stream').Transform;

const getJiraKeyLogo = function (request, response) {
    // try {
    //   auth(request.headers.key, request.app.keys);
    // } catch (err) {
    //   response.status(401);
    //   response.end();
    //   return;
    // }
  
    let endpoint = config.jira;
    endpoint.path = '/rest/api/2/project/' + request.params.key;

    https.get(endpoint, function(resp) {
      let result = [];
      resp.on('data', data => {
        result.push(data);
      });
      resp.on('end', () => {
        try {
        const url = JSON.parse(result).avatarUrls['48x48'];
        url.replace('https://jira.sed.hu', '');
        endpoint.url = url;
        https.get(endpoint.url, {headers: config.jira.headers}, function(resp2) {

          let img = new Stream();
          
          resp2.on('data', data => {
            img.push(data);
          });
          resp2.on('end', () => {
              fs.writeFileSync('./Images-Jira/' + request.params.key + '.png', img.read());
              response.writeHead(200, {'Content-Type': 'image/png' });
              response.end(fs.readFileSync('./Images-Jira/' + request.params.key + '.png'), 'binary');
          });
        });
      } catch(err) {
          response.sendFile(process.cwd() + '/Images-Jira/jira.png');
        }
      });
    });
};

  module.exports = {
    getJiraKeyLogo
  };