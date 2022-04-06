const express = require('express');
// Routes
const usersRoute = require('./users')
const expenseRoute = require('./expense')
const groupsRoute = require('./groups')
const societyRoute = require('./society')
const recipeRoute = require('./recipe')
const router = express.Router();


router.use('/users', usersRoute);
router.use('/expense', expenseRoute);
router.use('/groups', groupsRoute);
router.use('/society', societyRoute);
router.use('/recipe', recipeRoute)

module.exports = router;
