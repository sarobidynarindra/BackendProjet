const express = require('express');
const router = express.Router();
const ClientsContributeursGuidesController = require('../controller/FormationClients');

router.get('/clients-contributeurs-guides', ClientsContributeursGuidesController.getAllWithCleParcours);

module.exports = router;