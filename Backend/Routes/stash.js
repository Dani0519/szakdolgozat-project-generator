const express = require('express');
var router = express.Router();

router.use(function timeLog (req, res, next) {
  next();
});

const {
  getCommits,
  getTags,
  getAvatar,
  getBranches,
  getJiraKeys
} = require('../Requests/stash');

router.get('/:project/:repo/commits', getCommits);
router.get('/:key/:project/tags', getTags);
router.get('/:key/avatar', getAvatar);
router.get('/:key/:repo/branches', getBranches);
router.get('/jiraKeys', getJiraKeys);

module.exports = router;