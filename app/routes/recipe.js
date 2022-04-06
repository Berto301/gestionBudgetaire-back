const router = require('express').Router();
const RecipeController = require('../controllers/RecipeController');

router
    .route('/')
    // Insert a new Analytic
    .post(RecipeController.insert);
router
    .route('/')
    .get(RecipeController.findAll)


module.exports = router;