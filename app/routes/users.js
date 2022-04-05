const router = require('express').Router();
const UsersController = require('../controllers/UsersController');

router
    .route('/')
    // Insert a new Analytic
    .post(UsersController.insert);
router
    .route('/')
    .get(UsersController.findAll)


module.exports = router;