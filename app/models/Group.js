const mongoose = require ( "mongoose" );
const groupSchema = new mongoose.Schema ( {
    name:{
        type: String
    },
    activityArea: {
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
    //societyId:[_id]:null
}, { timestamps: true });
const Group = mongoose.model ( "Group", groupSchema );
module.exports = Group;