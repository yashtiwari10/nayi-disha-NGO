const express = require('express');
const router = express.Router();
const { createVolunteer } = require('../controllers/volunteerController');

router.post('/', createVolunteer);

module.exports = router;