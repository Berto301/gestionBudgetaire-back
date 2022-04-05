const mongoose = require ( "mongoose" );
const userSchema = new mongoose.Schema ( {
    name:{
        type: String
    },
    firstname: {
        type: String
    },
    email:{
        type: String
    },
    token:{
        type:String
    },
    password:{
        type:String
    },
    isAdmin:{
        type: Boolean // To check if an user is a superAdmin
    },
    //groupId
    //societyId:default:null
    //photo
}, { timestamps: true });
const Users = mongoose.model ( "Users", userSchema );
module.exports = Users;