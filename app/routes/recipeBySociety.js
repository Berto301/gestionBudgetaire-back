const router = require('express').Router();
const RecipeBySocietyController = require('../controllers/RecipeBySocietyController');

router
    .route('/')
    // Insert a new Analytic
    .post(RecipeBySocietyController.create);

router
    .route('/society/:id')
    .get(RecipeBySocietyController.getRecipeBySociety)

router
    .route('/group/:id')
    .get(RecipeBySocietyController.getByGroupId)
    
router
    .route('/:id')
    .get(RecipeBySocietyController.getById)
    .put(RecipeBySocietyController.update)
    .delete(RecipeBySocietyController.delete);

router
    .route('/delete-recipes/:ids')
    .delete(RecipeBySocietyController.deleteMoreRecipes)


module.exports = router;