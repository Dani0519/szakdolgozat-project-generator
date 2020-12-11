const express = require('express');
var router = express.Router();

router.use(function timeLog (req, res, next) {
  next();
});

const {
  uploadLog,
  deleteLogs,
  getLog
} = require('../Requests/logs');

router.post('/:project', uploadLog);
router.delete('/:project', deleteLogs);
router.get('/:project', getLog);

module.exports = router;