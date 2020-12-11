const express = require('express');
var router = express.Router();

router.use(function timeLog (req, res, next) {
  next();
});

const {
  uploadProject,
  getProject,
  getIntegratedProjects,
  uploadDeployResutls,
  uploadE2eResults,
  getDeployments,

  getRegisteredUsers,
  registerUser,
  deleteUser,

  getPullRequests
} = require('../Requests/firebase');

const {
  setPreVersion,
  setStagingVersion,
  setProductionVersion
} = require('../Requests/firebase-actions');

router.post('/project', uploadProject);
router.get('/project/:project', getProject);
router.get('/projects', getIntegratedProjects);
router.post('/deployment', uploadDeployResutls);
router.post('/e2e/:jobName', uploadE2eResults);
router.get('/deployment/:jobName', getDeployments);

// User management
router.get('/users', getRegisteredUsers);
router.post('/user', registerUser);
router.delete('/user/:id', deleteUser);

// Actions
router.post('/project/:project/setPreVersion', setPreVersion);
router.post('/project/:project/setStagingVersion', setStagingVersion);
router.post('/project/:project/setProductionVersion', setProductionVersion);

// Valami már leszarom
router.get('/project/:project/pull-requests', getPullRequests);

module.exports = router;