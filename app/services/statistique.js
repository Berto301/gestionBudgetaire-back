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
            turnover:{$first:"turnover"},
            count:{$sum:1}
          }
        },
      ]);
  }
}

module.exports = new Statistique();
