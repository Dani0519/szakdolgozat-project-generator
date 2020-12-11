const express = require('express');
var router = express.Router();

router.use(function timeLog (req, res, next) {
  next();
});

const {
  preRollback,
  stagingRollback,
  productionRollback
} = require('../Requests/rollback');

router.post('/:project/pre', preRollback);
router.post('/:project/staging', stagingRollback);
router.post('/:project/prod', productionRollback);

module.exports = router;