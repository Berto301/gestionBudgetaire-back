const router = require('express').Router();
const UsersController = require('../controllers/UsersController');

router
   .route('/:id')
   .get(UsersController.getById)
   .put(UsersController.updateById)

router
    .route('/register')
    .post(UsersController.register);
router
    .route('/login')
    .post(UsersController.login)


module.exports = router;