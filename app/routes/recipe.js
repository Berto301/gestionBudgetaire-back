const router = require('express').Router();
const RecipeController = require('../controllers/RecipeController');

router
    .route('/')
    // Insert a new Analytic
    .post(RecipeController.create);

router
    .route('/society/:id')
    .get(RecipeController.getRecipeBySociety)

router
    .route('/group/:id')
    .get(RecipeController.getByGroupId)
    
router
    .route('/:id')
    .get(RecipeController.getById)
    .put(RecipeController.update)
    .delete(RecipeController.delete);


module.exports = router;