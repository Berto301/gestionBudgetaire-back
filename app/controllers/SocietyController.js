const requestService = require("../services/request");
const Society = require("../models/Society");
const Users = require("../models/Users")
const ResponseUtil = require("../utils/response/response");

class SocietyController {
  constructor() {}

  delete = async (req, res, next) => {
    const io = req.app.get('socket');
    await requestService
      .findOneAndDeleteBy({ _id: req.params.id }, Society)
      .then(async(response) => {
        /**delete admin */
        const adminFinded = await requestService?.findOneBy({_id:response?.adminId},Users)
        if(adminFinded?._id){
          await requestService.deleteById({_id:adminFinded?._id},Users)
        }
        ResponseUtil.sendSuccess(res, {
          success: true,
          data: response,
          message: "Society Deleted",
        });
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
      .findOneBy({ _id: req.params.id }, Society)
      .then((_societyData) => {
        ResponseUtil.sendSuccess(res, _societyData );
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
      const io = req.app.get('socket');
      const {id} = req.params
      if(!id) return ResponseUtil.sendError(res,{message:"Society not found"})
      const societySameMatriculation = await requestService.findAll({immatriculation:req.body.immatriculation},Society)
      if(societySameMatriculation?.length){
        return res.json({success:false,message:"Immatriculation is already assigned to a company"})
      }
      const societyFinded = await requestService.findOneBy({_id:id},Society)
      if(societyFinded?._id){
        societyFinded.name = req.body.name
        societyFinded.type = req.body.type
        societyFinded.phone = req.body.phone
        societyFinded.email = req.body.email
        societyFinded.creationDate = req.body.creationDate
        societyFinded.lawerForm = req.body.lawerForm
        societyFinded.managementStyle = req.body.managementStyle
        societyFinded.accountBank = req.body.accountBank
        societyFinded.bank = req.body.bank
        societyFinded.immatriculation = req.body.immatriculation
        societyFinded.structure = req.body.structure
        societyFinded.turnover = req.body.turnover
        societyFinded.groupId = req.body.groupId
        societyFinded.adminId = req.body.adminId
         await societyFinded.save()
         .then((_society)=>{
           ResponseUtil.sendSuccess(res, _society);
           io.emit("reload_information",_society?.groupId)
           next();
         })

      }else{
        ResponseUtil.sendError(res,{message:"Society not found"})
      }
    } catch (error) {
      console.log("Creation expense", error);
    }
  };
  getByGroupId = async (req,res,next) =>{
    try{
      const {id}= req.params
      const society = await Society.find({groupId:id}).populate("adminId")
      ResponseUtil.sendSuccess(res,society)
      
    }catch(err){
      console.log(err)
    }
  }
}
module.exports = new SocietyController();
