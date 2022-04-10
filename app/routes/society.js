const router = require('express').Router();
const SocietyController = require('../controllers/SocietyController');

router
    .route('/:id')
    .get(SocietyController.getById)
    .put(SocietyController.update)
    .delete(SocietyController.delete);

router
    .route('/group/:id')
    .get(SocietyController.getByGroupId)

module.exports = router;