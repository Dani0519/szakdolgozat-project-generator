const { auth } = require('../tools');
global.XMLHttpRequest = require("xhr2");
let firebase = require('firebase');
require('firebase/storage');
let storage = firebase.storage();

const uploadLog = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  console.log(request.files);

  if (!request.files) {
    response.status(400).send('No files were uploaded.').end();
    return;
  }

  let file = request.files.file;
  let fileNow = Buffer.from(file.data);

  storage.ref().child(request.params.project + '/' + request.query.mode + '/' + file.name).put(fileNow).then(() => {
    response.send('File uploaded!');
    response.end();
  }).catch(err => {
    console.log(err);
    response.status(500).end();
  });

};

const deleteLogs = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  storage.ref().child(request.params.project + '/' + request.query.mode).listAll().then((res) => {
    res.items.forEach(item => {
      storage.ref().child(item.location.path).delete().catch(() => console.log( item.location.path + ' does not exists move on!'));
    });
    response.end();
  }).catch(() => {
    console.log('Error while getting ' + request.params.project + ' logs!');
    response.status(500);
    response.end();
  });

};

const getLog = function (request, response) {
  try {
    auth(request.headers.key, request.app.keys);
  } catch (err) {
    response.status(401);
    response.end();
    return;
  }

  storage.ref().child(request.params.project + '/' + request.query.path).getDownloadURL().then(url => {
    response.send({url: url});
    response.end();
  }).catch(err => {
    response.status(500);
    response.end();
  });
};

module.exports = {
  uploadLog,
  deleteLogs,
  getLog
};