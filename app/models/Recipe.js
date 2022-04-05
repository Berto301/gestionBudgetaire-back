const mongoose = require ( "mongoose" );
const recipeSchema = new mongoose.Schema ( {
    name:{
        type: String
    },
    realValue: {
        type: Number
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
    transactionNumber:{
        type: Number
    }
}, { timestamps: true });
const Recipe = mongoose.model ( "Recipe", recipeSchema );
module.exports = Recipe;