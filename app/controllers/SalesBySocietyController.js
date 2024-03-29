const requestService = require("../services/request");
const SalesBySociety = require("../models/SalesBySociety");
const ResponseUtil = require("../utils/response/response");
const mongoose = require("mongoose");
const SalesService = require("../services/sales.service")

class ExpenseController {
  constructor() {}
  create = async (req, res, next) => {
    try {
      const io = req.app.get('socket');
      const salesCreated = await requestService.create(req.body, SalesBySociety);
      if (salesCreated?._id) {
        ResponseUtil.sendSuccess(res,salesCreated);  
        io.emit("reload_information_society",salesCreated?.societyId)
        next();
      }
    } catch (error) {
      console.log("Creation SalesBySociety", error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { _id } = req.body;
      const io = req.app.get('socket');
      const salesUpdated = await requestService.updateById({_id},req.body,SalesBySociety);

      if (salesUpdated?._id) {
        ResponseUtil.sendSuccess(res, salesUpdated);
        io.emit("reload_information_society",salesUpdated?.societyId)
        next();
      }
    } catch (error) {
      console.log("Update SalesBySociety", error);
    }
  };

  delete = async (req, res, next) => {
    const io = req.app.get('socket');
    /* verification if a Expense is in relation with a society*/

    //end verification
    await requestService
      .findOneAndDeleteBy({ _id: req.params.id }, SalesBySociety)
      .then((response) => {
        ResponseUtil.sendSuccess(res,response);
        io.emit("reload_information_society",response?.societyId)
        next();
      })
      .catch((error) => {
        console.log(error);
        ResponseUtil.sendError(res, error);
        next(error);
      });
  };
  deleteMoreSales = async(req, res , next)=>{
    const io = req.app.get('socket')
    try{
        const ids = JSON.parse(req.params.ids)
        let idDeleted = 0
        let societyId =null
        if(ids?.length){
          for(let id of ids){
            await requestService.findOneAndDeleteBy({_id: mongoose.Types.ObjectId(id)},SalesBySociety)
            .then((data)=>{
              idDeleted++
              societyId = data.societyId
            })
          }
          if(idDeleted > 0){
            ResponseUtil.sendSuccess(res,societyId)
            io.emit("reload_information_society",societyId)
          }
        }else{
          ResponseUtil.sendError(res,{message:"Sales not found"})
        }
    }catch(error){
      console.log(error)
    }
  }

  getById = async (req, res, next) => {
    await requestService
      .findOneBy({ _id: req.params.id }, SalesBySociety)
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
       const data = await SalesService.getAllSalesBy(req.params.id)
      ResponseUtil.sendSuccess(res, data);
      next();
    } catch (err) {
      console.error(err);
      ResponseUtil.sendError(res, "An error occured");
      next(err);
    }
  };

  getByGroupId = async (req,res,next) =>{
      try {
      const data = await requestService.findAll(
        { groupId: mongoose.Types.ObjectId(req.params.id) },
        SalesBySociety
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
