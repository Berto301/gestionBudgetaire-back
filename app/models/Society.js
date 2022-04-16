const mongoose = require ( "mongoose" );
;
const Schema = mongoose.Schema;
const societySchema = new Schema ( {
    name:{
        type: String  //
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
    bank:{
        type: String
    },
    immatriculation:{
        type: String,
        unique:true
    },
    structure:{
        type: String,
    },
    turnover:{
        type:Number
    },
    groupId:{
      type: Schema.Types.ObjectId,
      ref: "Group"
    },
    adminId:{
      type: Schema.Types.ObjectId,
      ref: "Users"
    },
    //photo
}, { timestamps: true });
const Society = mongoose.model ( "Society", societySchema );
module.exports = Society;