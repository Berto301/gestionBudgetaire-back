const SalesBySociety = require("../models/SalesBySociety");
const Expense = require("../models/Expense");
const RecipeBySociety = require("../models/RecipeBySociety");
const Recipe = require("../models/Recipe");
const Society = require("../models/Society")
const mongoose = require("mongoose");

class Statistique {
  constructor() {}

  getAllSocietyByType(idGroup){

    return Society.aggregate([
        {
          $match: { groupId: mongoose.Types.ObjectId(idGroup) },
        },
        {
          $group:{
            _id:"$type",
            name:{$first:"$type"},
            count:{$sum:1}
          }
        },
      ]);
  }

  getAllSocietyByTurnOver(idGroup){

    return Society.aggregate([
        {
          $match: { groupId: mongoose.Types.ObjectId(idGroup) },
        },
        {
          $group:{
            _id:"$name",
            name:{$first:"$name"},
            turnover:{$first:"$turnover"},
          }
        },
      ]);
  }

getSalesBySociety(idSociety){
  return SalesBySociety.aggregate([
        {
          $match: { societyId: mongoose.Types.ObjectId(idSociety) },
        },
         {
          $lookup:{
            from: Expense.collection.name,
            let: {
              salesId: "$salesId"
            },
            pipeline:[
                 {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$salesId"]
                      }
                    }
                  },

                  {
                    $group:{
                      _id:"$name",
                      estimation:{$sum:"$estimation"}
                    }
                  }
            ],
            as:"sale"
          }
        },

            {
             $lookup: {
              from: Society.collection.name,
              localField: "societyId",
              foreignField: "_id",
              as: "society",
            },
          },
          {
          $unwind: {
              path: "$society",
              preserveNullAndEmptyArrays: true,
            },
          },
        {
          $unwind: {
              path: "$sale",
              preserveNullAndEmptyArrays: true,
            },
          },

        {
          $group:{
            _id:"$_id",
             sale:{$sum:"$sale.estimation"},
             realValue:{$sum:"$realValue"},
             turnover:{$first:"$society.turnover"}
          }
        },
        {
          $group:{
            _id:"$turnover",
             sale:{$sum:"$sale"},
             realValue:{$sum:"$realValue"},
             turnover:{$first:"$turnover"}
          }
        },


    ])
}

getRecipesBySociety(idSociety){
  return RecipeBySociety.aggregate([
        {
          $match: { societyId: mongoose.Types.ObjectId(idSociety) },
        },
         {
          $lookup:{
            from: Recipe.collection.name,
            let: {
              recipeId: "$recipeId"
            },
            pipeline:[
                 {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$recipeId"]
                      }
                    }
                  },

                  {
                    $group:{
                      _id:"$name",
                      estimation:{$sum:"$estimation"}
                    }
                  }
            ],
            as:"recipe"
          }
        },

            {
             $lookup: {
              from: Society.collection.name,
              localField: "societyId",
              foreignField: "_id",
              as: "society",
            },
          },
          {
          $unwind: {
              path: "$society",
              preserveNullAndEmptyArrays: true,
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
            _id:"$_id",
             recipe:{$sum:"$recipe.estimation"},
             realValue:{$sum:"$realValue"},
             turnover:{$first:"$society.turnover"}
          }
        },
        {
          $group:{
            _id:"$turnover",
             recipe:{$sum:"$recipe"},
             realValue:{$sum:"$realValue"},
             turnover:{$first:"$turnover"}
          }
        },


    ])
}

  getRecipesByGroup(idGroup){
    return RecipeBySociety.aggregate([
        {
            $match: { groupId: mongoose.Types.ObjectId(idGroup) },

          },
         {
          $lookup:{
            from: Recipe.collection.name,
            let: {
              recipeId: "$recipeId"
            },
            pipeline:[
                 {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$recipeId"]
                      }
                    }
                  },

                  {
                    $group:{
                      _id:"$name",
                      estimation:{$sum:"$estimation"}
                    }
                  }
            ],
            as:"recipe"
          }
        },

            {
             $lookup: {
              from: Society.collection.name,
              localField: "societyId",
              foreignField: "_id",
              as: "society",
            },
          },
          {
          $unwind: {
              path: "$society",
              preserveNullAndEmptyArrays: true,
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
            _id:"$_id",

             name:{$first:"$society.name"},
             recipe:{$sum:"$recipe.estimation"},
             realValue:{$sum:"$realValue"},
             turnover:{$first:"$society.turnover"}
          }
        },
        {
          $group:{
            _id:"$name",

             recipe:{$sum:"$recipe"},
             realValue:{$sum:"$realValue"},
             turnover:{$first:"$turnover"},
            name:{$first:"$name"}
          }
        },

      ])
  }

   getSalesByGroup(idGroup){
    return SalesBySociety.aggregate([
        {
            $match: { groupId: mongoose.Types.ObjectId(idGroup) },

          },
         {
          $lookup:{
            from: Expense.collection.name,
            let: {
              salesId: "$salesId"
            },
            pipeline:[
                 {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$salesId"]
                      }
                    }
                  },

                  {
                    $group:{
                      _id:"$name",
                      estimation:{$sum:"$estimation"}
                    }
                  }
            ],
            as:"sale"
          }
        },

            {
             $lookup: {
              from: Society.collection.name,
              localField: "societyId",
              foreignField: "_id",
              as: "society",
            },
          },
          {
          $unwind: {
              path: "$society",
              preserveNullAndEmptyArrays: true,
            },
          },
        {
          $unwind: {
              path: "$sale",
              preserveNullAndEmptyArrays: true,
            },
          },

        {
          $group:{
            _id:"$_id",

             name:{$first:"$society.name"},
             sale:{$sum:"$sale.estimation"},
             realValue:{$sum:"$realValue"},
             turnover:{$first:"$society.turnover"}
          }
        },
        {
          $group:{
            _id:"$name",

             sale:{$sum:"$sale"},
             realValue:{$sum:"$realValue"},
             turnover:{$first:"$turnover"},
            name:{$first:"$name"}
          }
        },

      ])
  }
 
}

module.exports = new Statistique();
