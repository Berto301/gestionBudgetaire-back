const router = require('express').Router();
const ExpenseController = require('../controllers/ExpenseController');

router
    .route('/')
    // Insert a new Analytic
    .post(ExpenseController.create);

router
    .route('/society/:id')
    .get(ExpenseController.getExpenseBySociety)

router
    .route('/group/:id')
    .get(ExpenseController.getByGroupId)
    
router
    .route('/:id')
    .get(ExpenseController.getById)
    .put(ExpenseController.update)
    .delete(ExpenseController.delete);


module.exports = router;