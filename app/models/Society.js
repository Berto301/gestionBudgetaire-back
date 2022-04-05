const mongoose = require ( "mongoose" );
const societySchema = new mongoose.Schema ( {
    name:{
        type: String
    },
    type: {
        type: String
    },
    phone: {
        type: String
    },
    email:{
        type: String
    },
    creationDate:{
        type: Date
    },
    lawerForm: {
        type: String
    },
    managementStyle:{
        type: String
    },
    accountBank: {
        type: String
    },
    Bank:{
        type: String
    },
    Immatriculation:{
        type: String,
        unique:true
    },
    turnover:{
        type:Number
    }
    //Entry:[_id]:null
    //Out:[_id]:null
    //photo
}, { timestamps: true });
const Society = mongoose.model ( "Society", societySchema );
module.exports = Society;