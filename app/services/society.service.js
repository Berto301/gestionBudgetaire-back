const Society = require("../models/Society");
const DataImage = require("../models/DataImage");
const Users = require("../models/Users")
const mongoose = require("mongoose");

class SocietyService {
  constructor() {}

  getById(idGroup) {
    return Society.aggregate([
      {
        $match: { groupId: mongoose.Types.ObjectId(idGroup) },
      },
      {
        $lookup:{
            from: Users.collection.name,
            localField: "adminId",
            foreignField: "_id",
            as: "admin"
        }
      },
      {
        $unwind: {
          path: "$admin",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup:{
            from: DataImage.collection.name,
            localField: "adminId",
            foreignField: "source",
            as: "photo"
        }
      },
      {
        $unwind: {
          path: "$photo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup:{
            from: DataImage.collection.name,
            localField: "_id",
            foreignField: "source",
            as: "logo"
        }
      },
      {
        $unwind: {
          path: "$logo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name:1,
          locationUser:"$photo.name",
          logo:"$logo.name",
          type:1,
          bank:1,
          lawerForm:1,
          adminData:"$admin",
          //username: { $concat: ["$admin.name", " ", "$admin.firstname"] },
          turnover:1,
          phone:1,
          email:1,
          creationDate:1,
          managementStyle:1,
          accountBank:1,
          immatriculation:1,
          structure:1,
          groupId:1,
          adminId:1,
          
          
        },
      },
    ]);
  }
}

module.exports = new SocietyService();
