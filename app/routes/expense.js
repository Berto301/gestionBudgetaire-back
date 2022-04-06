const router = require('express').Router();
const ExpenseController = require('../controllers/ExpenseController');

router
    .route('/')
    // Insert a new Analytic
    .post(ExpenseController.insert);
router
    .route('/')
    .get(ExpenseController.findAll)


module.exports = router;