const express = require('express');
var router = express.Router();

router.use(function timeLog (req, res, next) {
  next();
});

const {
    getJiraKeyLogo
} = require('../Requests/jira');

router.get('/:key', getJiraKeyLogo);

module.exports = router;