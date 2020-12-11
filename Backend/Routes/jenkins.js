const express = require('express');
var router = express.Router();

const {
  getData,
  getViews,
  getPipelines,
  getPipeline,
  getBuild
} = require('../Requests/jenkins');

const {
  enablePipeline,
  disablePipeline
} = require('../Requests/jenkins-actions');


router.use(function timeLog (req, res, next) {
  next();
});

// Routes
router.get('/data', getData);
router.get('/views', getViews);
router.get('/pipelines', getPipelines);
router.get('/:pipeline', getPipeline);
router.get('/:pipeline/:buildNumber', getBuild);

// Actions
router.post('/:pipeline/enable', enablePipeline);
router.post('/:pipeline/disable', disablePipeline);

module.exports = router;