const express = require('express');
// Routes
const bullesRoute = require('./admin')
const router = express.Router();


router.use('/bulles', bullesRoute);

module.exports = router;
