const express = require('express');
const router = express.Router();
const matrixController = require('../controllers/matrixController');

router.post('/rotate', matrixController.handleMatrix);

module.exports = router;
