const router = require('express').Router();
const DataImage = require('../controllers/DataImage');
const upload = require("../utils/upload")
const express = require
router
    .route('/')
        .post(upload?.single('profileImg'), DataImage.uploadImage);
// router
//     .route('/images')
//     .get(DataImage.getImage)




module.exports = router;