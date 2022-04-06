const router = require('express').Router();
const SocietyController = require('../controllers/SocietyController');

router
    .route('/:id')
    .get(SocietyController.getById)
    router
    .route('/:id')
    .put(SocietyController.update)
    .delete(SocietyController.delete);


module.exports = router;