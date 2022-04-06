const router = require('express').Router();
const GroupController = require('../controllers/GroupController');

router
    .route('/')
    // Insert a new Analytic
    .post(GroupController.insert);
router
    .route('/')
    .get(GroupController.findAll)


module.exports = router;