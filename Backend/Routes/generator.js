const express = require('express');
var router = express.Router();

router.use(function timeLog (req, res, next) {
  next();
});

const {
    reCreateProject,
    createProject
} = require('../Requests/generator');

router.post('/:key/regenerate', reCreateProject);
router.post('/:key/create', createProject);

module.exports = router;