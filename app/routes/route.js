const express = require('express');
// Routes
const usersRoute = require('./users')
const expenseRoute = require('./expense')
const groupsRoute = require('./groups')
const societyRoute = require('./society')
const recipeRoute = require('./recipe')
const recipeBysociety = require('./recipeBySociety')
const SalesBySociety = require('./salesBySociety')
const router = express.Router();


router.use('/users', usersRoute);
router.use('/expense', expenseRoute);
router.use('/groups', groupsRoute);
router.use('/society', societyRoute);
router.use('/recipe', recipeRoute)
router.use('/salesBySociety', SalesBySociety);
router.use('/recipeBysociety', recipeBysociety)

module.exports = router;
