const express = require('express');
// Routes
const usersRoute = require('./users')
const router = express.Router();


router.use('/users', usersRoute);

module.exports = router;
