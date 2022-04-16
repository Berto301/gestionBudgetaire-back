const Users = require("../models/Users");
const DataImage = require("../models/DataImage");
const mongoose = require("mongoose");

class UsersService {
  constructor() {}

  getById(idUsers) {
    return DataImage.aggregate([
      {
        $match: { source: mongoose.Types.ObjectId(idUsers) },
      },
      {
        $project: {
          _id: 1,
          source:1,
          originalName:"$photo.location"
        },
      },
    ]);
  }
}

module.exports = new UsersService();
