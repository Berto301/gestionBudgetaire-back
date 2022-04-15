const router = require('express').Router();
const DataImage = require('../controllers/DataImage');
const upload = require("../utils/upload")
router
    .route('/')
        .post(upload?.single('profileImg'), DataImage.uploadImage);




module.exports = router;