const router = require('express').Router();
const SalesBySocietyController = require('../controllers/SalesBySocietyController');

router
    .route('/')
    // Insert a new Analytic
    .post(SalesBySocietyController.create);

router
    .route('/society/:id')
    .get(SalesBySocietyController.getExpenseBySociety)

router
    .route('/group/:id')
    .get(SalesBySocietyController.getByGroupId)
    
router
    .route('/:id')
    .get(SalesBySocietyController.getById)
    .put(SalesBySocietyController.update)
    .delete(SalesBySocietyController.delete);


module.exports = router;