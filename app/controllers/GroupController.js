const requestService = require("../services/request");
const Group = require("../models/Group");
const ResponseUtil = require("../utils/response/response");

class GroupController {
  constructor() {}
  

  getById = async (req, res, next) => {
    try {
      await requestService
      .findOneBy({ _id: req.params.id }, Group)
      .then((_groupsData) => {
        ResponseUtil.sendSuccess(res,_groupsData);
        next();
      })
      .catch((error) => {
        console.log(error);
        ResponseUtil.sendError(res, error);
        next(error);
      });
    } catch (error) {
      console.log("error getting groups",error)
    }
   
  };
  updateById = async (req,res,next)=>{
    try {
      const {id} = req.params
      if(!id) return res.json({success:false,message:"Group not found"})
      const groupFinded = await requestService.findOneBy({ _id: id }, Group)
      const{name,email,phone,activityArea} = req.body
      if(groupFinded?._id){
        groupFinded.name= name
        groupFinded.email = email
        groupFinded.phone = phone
        groupFinded.activityArea = activityArea
        await groupFinded.save()
        .then((groups)=>{
          ResponseUtil.sendSuccess(res,groups)
          next()
        })
      }
    } catch (error) {
      console.log("error updating groups",error)
    }
  }
 

  
}
module.exports = new GroupController();
