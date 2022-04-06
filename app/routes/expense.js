const router = require('express').Router();
const ExpenseController = require('../controllers/ExpenseController');

router
    .route('/')
    // Insert a new Analytic
    .post(ExpenseController.create);
router
    .route('/:id')
    .get(ExpenseController.getById)

router
    .route('/getBySociety/:id')
    .get(ExpenseController.getExpenseBySociety)
router
    .route('/:id')
    .get(ExpenseController.getById)
router
    .route('/:id')
    .put(ExpenseController.update)
    .delete(ExpenseController.delete);


module.exports = router;