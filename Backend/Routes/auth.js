const express = require('express');
const uuid = require('uuid/v1');
var router = express.Router();
const ApiKey = require('../Classes/ApiKey');

router.use(function timeLog (req, res, next) {
  next();
});

router.get('/login', (request, response) => {
  const key = uuid();
  const apiKey = new ApiKey(key);
  request.app.keys.push(apiKey);
  response.send({ key: key});
  response.end();
});

router.get('/logout', (request, response) => {
  const req_key = request.headers.key;
  request.app.keys = request.app.keys.filter(key => key !== req_key);
  console.log(request.app.keys);
  response.end();
});

module.exports = router;