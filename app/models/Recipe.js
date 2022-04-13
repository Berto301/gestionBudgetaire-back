const mongoose = require ( "mongoose" );
const Schema = mongoose.Schema;
const recipeSchema = new Schema ( {
    name:{
        type: String
    },
    date:{
        type: Date
    },
    icon:{
        type: String
    },
    color:{
        type: String
    },
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
}, { timestamps: true });
const Recipe = mongoose.model ( "Recipe", recipeSchema );
module.exports = Recipe;