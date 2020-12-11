'use strict';

var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const https = require('https');
const { execSync } = require('child_process');

const config = require('./config');
let firebase = require('firebase/app');
const admin = require('firebase-admin');
const serviceAccount = require('./key.json');

firebase.initializeApp(config.firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ''
});

// Routes
const jenkins = require('./Routes/jenkins');
const auth = require('./Routes/auth');
const firebaseRoute = require('./Routes/firebase');
const deploy = require('./Routes/deploy');
const stash = require('./Routes/stash');
const logs = require('./Routes/logs');
const rollback = require('./Routes/rollback');
const jira = require('./Routes/jira');
const generator = require('./Routes/generator')
const { fstat } = require('fs');
const { resolve } = require('path');

var app = express();
app.admin = admin;

app.keys = new Array();

app.use(
  bodyParser.json({ limit: '50mb' }),
  bodyParser.urlencoded({ limit: '50mb', extended: true }),
  fileUpload(),
);

var originsWhitelist = ['http://localhost:8100', 'http://localhost:8101', 'http://localhost:8200', 'http://localhost:8201', 'https://inclouded-dashboard.web.app', 'https://inclouded-dashboard.firebaseapp.com'];

var nginxPrefix = '';
if (process.env.MODE == 'production') {
  nginxPrefix = "/monitorbe";
}

const corsOptions = {
  origin: function (origin, callback) {
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions));

app.use(nginxPrefix + '/auth', auth);
app.use(nginxPrefix + '/jenkins', jenkins);
app.use(nginxPrefix + '/firebase', firebaseRoute);
app.use(nginxPrefix + '/deploy', deploy);
app.use(nginxPrefix + '/stash', stash);
app.use(nginxPrefix + '/logs', logs);
app.use(nginxPrefix + '/rollback', rollback);
app.use(nginxPrefix + '/jira', jira);
app.use(nginxPrefix + '/generator', generator);

const getPullRequests = async function () {

  console.log('Fethcing pull requests!');

  const argument = { 'create': new Array(), 'delete': new Array() };
  const db = firebase.firestore();

  const projects_snap = await db.collection('Projects').get();
  const projects = new Array();
  projects_snap.forEach(project => {
    projects.push(project.data());
  });

  for (const project of projects) {

    const new_ps = await new Promise((resolve, reject) => {
      let endpoint = config.stash;
      endpoint.path = `/rest/api/1.0/projects/${project.jiraKey}/repos/${project.repository.split('/')[5].replace('.git', '')}/pull-requests`;

      https.get(endpoint, resp => {
        let result = '';
        resp.on('data', data => result += data);
        resp.on('end', () => {
          const toUpload = new Array();
          const pullRequests = JSON.parse(result).values;
          const opened = pullRequests.filter(ps => ps.state === 'OPEN');
          if (opened.length > 0) {
            opened.forEach(ps => {
              toUpload.push({ source: ps.fromRef.displayId, author: ps.author.user.displayName });
            });
          }
          resolve(toUpload);
        });
      });
    });

    if (new_ps.length > 0) {
      const fs_cur_snap = undefined;
      try {
        fs_cur_snap = await (await db.collection('Pull-Requests').doc(project.name).get()).data().values;
        fs_cur_snap.forEach(ex_ps => {
          const con_test_id = new_ps.findIndex(ne_ps => ne_ps.source === ex_ps.source);
          if (con_test_id === -1) {
            // Mark for delete
            argument.delete.push({
              project_id: project['pre-id'],
              site: ex_ps.source.replace('/', '-').toLowerCase(),
              author: ex_ps.author,
              source: ex_ps.source,
              projectName: project.name
            });
          } else {
            if (ex_ps['deployed'] === undefined) {
              // Mark for deploy
              argument.create.push({
                project_id: project['pre-id'],
                site: ex_ps.source.replace('/', '-').toLowerCase(),
                author: ex_ps.author,
                source: ex_ps.source,
                projectName: project.name
              });
            } else {
              // Already deployed
            }
          }
        });
      } catch (err) {
        new_ps.forEach(ps => {
          argument.create.push({
            project_id: project['pre-id'],
            site: ps.source.replace('/', '-').toLowerCase(),
            author: ps.author,
            source: ps.source,
            projectName: project.name
          });
        });
      }
    }
  }
  // console.log(argument);
  // Run the python selenium script
  // console.log('Run the script');
  execSync("python3 hosting-site.py '" + JSON.stringify(argument) + "'");
  console.log('Fetching ended');
};

const server = app.listen(process.env.PORT || 3000, function () {
  console.log('The server has been started on ' + server.address().port + '!');

  if (process.env.MODE == 'production') {
    console.log('Running in production mode!');
  }

  setInterval(getPullRequests, config.pullRequestsUpdateTime);
  // getPullRequests()

});

module.exports = { app };