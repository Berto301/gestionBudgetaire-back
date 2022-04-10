const mongoose = require ( "mongoose" );
const Schema = mongoose.Schema;
const userSchema = new Schema ( {
    name:{
        type: String
    },
    firstname: {
        type: String
    },
    email:{
        type: String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    isAdmin:{
        type: Boolean // To check if an user is a superAdmin
    },
    groupId:{
      type: Schema.Types.ObjectId,
      ref: "Group"
    },
    societyId:{
      type: Schema.Types.ObjectId,
      ref: "Society"
    }
    //photo
}, { timestamps: true });
const Users = mongoose.model ( "Users", userSchema );
module.exports = Users;