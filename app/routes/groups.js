const router = require('express').Router();
const GroupController = require('../controllers/GroupController');

router
    .route('/:id')
    .get(GroupController.getById)


module.exports = router;