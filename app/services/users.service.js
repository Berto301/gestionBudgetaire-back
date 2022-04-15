const Users = require("../models/Users");
const DataImage = require("../models/DataImage");
const mongoose = require("mongoose");

class UsersService {
  constructor() {}

  getById(idUsers) {
    return Users.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(idUsers) },
      },
      {
        $lookup: {
          from: DataImage.collection.name,
          localField: "_id",
          foreignField: "source",
          as: "photo",
        },
      },
      {
        $unwind: {
          path: "$photo",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $project: {
          _id: 1,
          name: 1,
          firstname: 1,
          email: 1,
          isAdmin: 1,
          groupId:1,
          societyId:1,
          photoId:"$photo._id",
          originalName:"$photo.name"
        },
      },
    ]);
  }
}

module.exports = new UsersService();
