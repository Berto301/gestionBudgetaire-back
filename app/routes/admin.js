const router = require('express').Router();
const BullesController = require('../controllers/AdminController');

router
    .route('/')
    // Insert a new Analytic
    .post(BullesController.insert);
router
    .route('/')
    .get(BullesController.findAll)


module.exports = router;