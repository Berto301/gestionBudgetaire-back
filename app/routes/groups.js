const router = require('express').Router();
const GroupController = require('../controllers/GroupController');

router
    .route('/:id')
    .get(GroupController.getById)
    .put(GroupController.updateById)
router
    .route('/statistic/:id')
    .get(GroupController.getStatisticsById)


module.exports = router;