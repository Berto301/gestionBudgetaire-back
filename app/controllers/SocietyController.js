const requestService = require("../services/request");
const Society = require("../models/Society");
const ResponseUtil = require("../utils/response/response");

class SocietyController {
  constructor() {}

  delete = async (req, res, next) => {
    //const io = req.app.get('socket');
    await requestService
      .findOneAndDeleteBy({ _id: req.params.id }, Society)
      .then((response) => {
        // io.emit(GROUP_EVENT, response.Enterprise[0]);
        /**delete Admin */
        ResponseUtil.sendSuccess(res, {
          success: true,
          data: response,
          message: "Society Deleted",
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
      .findOneBy({ _id: req.params.id }, Society)
      .then((_societyData) => {
        ResponseUtil.sendSuccess(res, { data: _societyData });
        next();
      })
      .catch((error) => {
        console.log(error);
        ResponseUtil.sendError(res, error);
        next(error);
      });
  };
  update = async (req, res, next) => {
    try {
      const { name } = req.body;
      const findGroup = await requestService.findOneBy({ name , _id: { $ne: req.params.id } }, Group);
      if (findGroup?._id) {
        res.json({ success: false, findGroup: true });
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
}
module.exports = new SocietyController();
