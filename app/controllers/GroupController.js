const requestService = require("../services/request");
const Group = require("../models/Group");
const ResponseUtil = require("../utils/response/response");

class GroupController {
  constructor() {}
  

  getById = async (req, res, next) => {
    await requestService
      .findOneBy({ _id: req.params.id }, Group)
      .then((_groupsData) => {
        ResponseUtil.sendSuccess(res, {data:_groupsData});
        next();
      })
      .catch((error) => {
        console.log(error);
        ResponseUtil.sendError(res, error);
        next(error);
      });
  };

  
}
module.exports = new GroupController();
