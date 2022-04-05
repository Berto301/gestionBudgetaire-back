const mongoose = require ( "mongoose" );
const bullesSchema = new mongoose.Schema ( {
    title:{
        type: String
    },
    value: {
        en :{
            type: String
            
        },
        fr:{
            type: String
        }
    },
    contentHTML:{
        en :{
            type: String
            
        },
        fr:{
            type: String
        } 
    },
    status:{
        type: Boolean
    }
}, { timestamps: true });
const Bulles = mongoose.model ( "Bulles", bullesSchema );
module.exports = Bulles;