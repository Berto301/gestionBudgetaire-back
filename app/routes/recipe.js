const router = require('express').Router();
const RecipeController = require('../controllers/RecipeController');

router
    .route('/')
    // Insert a new Analytic
    .post(RecipeController.create);
router
    .route('/:id')
    .get(RecipeController.getById)

router
    .route('/getBySociety/:id')
    .get(RecipeController.getRecipeBySociety)
router
    .route('/:id')
    .get(RecipeController.getById)
router
    .route('/:id')
    .put(RecipeController.update)
    .delete(RecipeController.delete);


module.exports = router;