const RecipeBySociety = require("../models/RecipeBySociety");
const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");

class RecipeService {
  constructor() {}

  getAllRecipesBy(idSociety) {
    return RecipeBySociety.aggregate([
      {
        $match: { societyId: mongoose.Types.ObjectId(idSociety) },
      },
      {
        $lookup: {
          from: Recipe.collection.name,
          localField: "recipeId",
          foreignField: "_id",
          as: "recipe",
        },
      },
      {
        $unwind: {
          path: "$recipe",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $group:{
          _id:"$recipe._id",
          name:{$first:"$recipe.name"},
          icon:{$first:"$recipe.icon"},
          color:{$first:"$recipe.color"},
          estimation:{$first:"$recipe.estimation"},
          realValue:{$sum:"$realValue"},
          count:{$sum:1}
        }
      },
    ]);
  }
}

module.exports = new RecipeService();
