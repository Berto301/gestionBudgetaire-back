const SalesBySociety = require("../models/SalesBySociety");
const Expense = require("../models/Expense");
const mongoose = require("mongoose");

class RecipeService {
  constructor() {}

  getAllSalesBy(idSociety) {
    return SalesBySociety.aggregate([
      {
        $match: { societyId: mongoose.Types.ObjectId(idSociety) },
      },
      {
        $lookup: {
          from: Expense.collection.name,
          localField: "salesId",
          foreignField: "_id",
          as: "sales",
        },
      },
      {
        $unwind: {
          path: "$sales",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $group: {
          _id: "$sales._id",
          name: { $first: "$sales.name" },
          icon: { $first: "$sales.icon" },
          color: { $first: "$sales.color" },
          estimation: { $first: "$sales.estimation" },
          realValue: { $sum: "$realValue" },
          count: { $sum: 1 },
          idSales:{$push:"$_id"}
        },
      },
    ]);
  }
}

module.exports = new RecipeService();
