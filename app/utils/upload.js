let express = require('express'),
    multer = require('multer'),
    router = express.Router();
const DIR = '.../../public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        console.log(file)
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() +fileName)
    }
});

let uploadPhoto = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
module.exports = uploadPhoto;