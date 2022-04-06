const requestService = require("../services/request");
const Expense = require("../models/Expense");
const ResponseUtil = require("../utils/response/response");
const mongoose = require("mongoose");

class ExpenseController {
  constructor() {}
  create = async (req, res, next) => {
    try {
      const { name } = req.body;
      const findExpense = await requestService.findOneBy({ name }, Expense);
      if (findExpense?._id) {
        res.json({ success: false, findExpense: true });
        next();
        return;
      }

      const expensesCreated = await requestService.create(req.body, Expense);
      if (expensesCreated?._id) {
        ResponseUtil.sendSuccess(res, {
          success: true,
          message: "Expense created",
        });
        next();
      }
    } catch (error) {
      console.log("Creation expense", error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { name } = req.body;
      const findExpense = await requestService.findOneBy({ name , _id: { $ne: req.params.id } }, Expense);
      if (findExpense?._id) {
        res.json({ success: false, findExpense: true });
        next();
        return;
      }

      const expensesCreated = await requestService.updateById(req.body, Expense);

      if (expensesCreated?._id) {
        ResponseUtil.sendSuccess(res, {
          success: true,
          message: "Expense created",
        });
        next();
      }
    } catch (error) {
      console.log("Creation expense", error);
    }
  };

  delete = async (req, res, next) => {
    //const io = req.app.get('socket');
    await requestService
      .findOneAndDeleteBy({ _id: req.params.id }, Expense)
      .then((response) => {
        // io.emit(GROUP_EVENT, response.Enterprise[0]);
        ResponseUtil.sendSuccess(res, {
          success: true,
          data: response,
          message: "Expense Deleted",
        });
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
      .then((expense) => {
        ResponseUtil.sendSuccess(res, expense);
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
      const expenses = await requestService.findOneBy(
        { societyId: mongoose.Types.ObjectId(req.params.id) },
        Expense
      );
      ResponseUtil.sendSuccess(res, expenses);
      next();
    } catch (err) {
      console.error(err);
      ResponseUtil.sendError(res, "An error occured");
      next(err);
    }
  };
}
module.exports = new ExpenseController();
