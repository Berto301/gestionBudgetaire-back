const mongoose = require ( "mongoose" );

const Schema = mongoose.Schema;
const recipeBySocietySchema = new Schema ( {
    
    realValue: {
        type: Number
    },
    date:{
        type: Date
    },
    description:{
        type:String
    },
    transactionNumber:{
        type: Number
    },
    groupId:{
      type: Schema.Types.ObjectId,
      ref: "Group"
    },
    societyId:{
      type: Schema.Types.ObjectId,
      ref: "Society"
    },
    salesId:{
      type: Schema.Types.ObjectId,
      ref: "Recipe"
    }
}, { timestamps: true });
const RecipeBySociety = mongoose.model ( "RecipeBySociety", recipeBySocietySchema );
module.exports = RecipeBySociety;