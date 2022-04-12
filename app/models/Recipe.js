const mongoose = require ( "mongoose" );
const Schema = mongoose.Schema;
const recipeSchema = new Schema ( {
    name:{
        type: String
    },
    // realValue: {
    //     type: Number
    // },
    date:{
        type: Date
    },
    icon:{
        type: String
    },
    color:{
        type: String
    },
    // transactionNumber:{
    //     type: Number
    // },
    
    estimation:{
        type:Number
    },

    description:{
        type:String
    },
    groupId:{
      type: Schema.Types.ObjectId,
      ref: "Group"
    },
    // societyId:{
    //   type: Schema.Types.ObjectId,
    //   ref: "Society"
    // }
}, { timestamps: true });
const Recipe = mongoose.model ( "Recipe", recipeSchema );
module.exports = Recipe;