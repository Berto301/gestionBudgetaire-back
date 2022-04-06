const router = require('express').Router();
const SocietyController = require('../controllers/SocietyController');

router
    .route('/')
    // Insert a new Analytic
    .post(SocietyController.insert);
router
    .route('/')
    .get(SocietyController.findAll)


module.exports = router;