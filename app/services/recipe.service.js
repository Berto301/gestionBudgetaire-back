const RecipeBySociety = require('../models/RecipeBySociety');
const Recipe= require('../models/Recipe');
const mongoose = require('mongoose')

class EnterpriseService {
  constructor(){}

  getAllRecipesBy(idSociety) {
    return RecipeBySociety.aggregate([
      {
        $match: { societyId: mongoose.Types.ObjectId(idSociety) }
      },
          {
            $lookup:
            {
              from: Recipe.collection.name,
               let: {
                recipeId: "$recipeId"
                },
              pipeline: [
                {
                  $match:{
                    $expr:{
                      $eq:["_id","$$recipeId"]
                    }
                  }
                }
              ],
              as:"recipe"
        //   localField: "recipeId",
        //   foreignField: "_id",
        //   as: "recipe"
        // }  
      }},
     {
       $unwind:
          {
          path: '$recipe',
          preserveNullAndEmptyArrays: true
           }
         },

      {
        $project:{
          _id:1,
          realValue:1,
          date:1,
        }
      }
    ])
  }

 
}

module.exports = new EnterpriseService();