const express = require('express');
var router = express.Router();

const {
  startPreStaging,
  startStaging,
  startProduction,
  startCustomCOVID
} = require('../Requests/startProject');

router.use(function timeLog (req, res, next) {
  next();
});

router.post('/pre/:project', startPreStaging);
router.post('/staging/:project', startStaging);
router.post('/production/:project', startProduction);
router.post('/customPre/:project', startCustomCOVID);

module.exports = router;