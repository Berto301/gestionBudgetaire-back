const mongoose = require ( "mongoose" );
const dataImageSchema = new mongoose.Schema ( {
    name:{
        type: String
    },
    mimetype: {
        type: String
    },
    size: {
        type: Number
    },
    location:{
        type: String
    },
    // bucket:{

    // }
}, { timestamps: true });
const DataImage = mongoose.model ( "DataImage", dataImageSchema );
module.exports = DataImage;