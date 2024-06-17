const express = require('express');
const router = express.Router();
const planificationController = require('../controller/PlanificationController');

router.post('/addPlanifications', planificationController.addPlanifications);

module.exports = router;