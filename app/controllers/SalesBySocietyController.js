const requestService = require("../services/request");
const Expense = require("../models/Expense");
const ResponseUtil = require("../utils/response/response");
const mongoose = require("mongoose");

class ExpenseController {
  constructor() {}
  create = async (req, res, next) => {
    try {
      const io = req.app.get('socket');
      const { name } = req.body;
      const findSales = await requestService.findOneBy({ name }, Expense);
      if (findSales?._id) {
        res.json({ success: false, message:"Name already used"});
        next();
        return;
      }

      const salesCreated = await requestService.create(req.body, Expense);
      if (salesCreated?._id) {
        ResponseUtil.sendSuccess(res,salesCreated);  
        io.emit("reload_information",salesCreated?.groupId)
        next();
      }
    } catch (error) {
      console.log("Creation Expense", error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { name,_id } = req.body;
      const io = req.app.get('socket');
      const findSales = await requestService.findOneBy(
        { name, _id: { $ne: req.params.id } },
        Expense
      );
      if (findSales?._id) {
        res.json({ success: false, message:"Name already used"});
        next();
        return;
      }
      const salesUpdated = await requestService.updateById({_id},req.body,Expense);

      if (salesUpdated?._id) {
        ResponseUtil.sendSuccess(res, salesUpdated);
        io.emit("reload_information",salesUpdated?.groupId)
        next();
      }
    } catch (error) {
      console.log("Creation Expense", error);
    }
  };

  delete = async (req, res, next) => {
    const io = req.app.get('socket');
    /* verification if a Expense is in relation with a society*/

    //end verification
    await requestService
      .findOneAndDeleteBy({ _id: req.params.id }, Expense)
      .then((response) => {
        ResponseUtil.sendSuccess(res,response);
        io.emit("reload_information",response?.groupId)
        next();
      })
      .catch((error) => {
        console.log(error);
        ResponseUtil.sendError(res, error);
        next(error);
      });
  };

  getById = async (req, res, next) => {
    await requestService
      .findOneBy({ _id: req.params.id }, Expense)
      .then((_salesData) => {
        ResponseUtil.sendSuccess(res,  _salesData );
        next();
      })
      .catch((error) => {
        console.log(error);
        ResponseUtil.sendError(res, error);
        next(error);
      });
  };

  getExpenseBySociety = async (req, res, next) => {
    try {
      const data = await requestService.findOneBy(
        { societyId: mongoose.Types.ObjectId(req.params.id) },
        Expense
      );
      ResponseUtil.sendSuccess(res, data);
      next();
    } catch (err) {
      console.error(err);
      ResponseUtil.sendError(res, "Une erreur s'est produite");
      next(err);
    }
  };

  getByGroupId = async (req,res,next) =>{
      try {
      const data = await requestService.findAll(
        { groupId: mongoose.Types.ObjectId(req.params.id) },
        Expense
      );
      ResponseUtil.sendSuccess(res, data);
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
module.exports = new ExpenseController();
