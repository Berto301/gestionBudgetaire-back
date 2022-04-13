const requestService = require("../services/request");
const Group = require("../models/Group");
const StatisticService = require("../services/statistique")
const ResponseUtil = require("../utils/response/response");
const {COLORS} = require("../utils/_constants")

class GroupController {
  constructor() {}
  
  geRandomValue (array){
    return array[Math.floor(Math.random() * array.length)]
  }
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
      const io = req.app.get('socket');
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
          io.emit("reload_information",groups?._id)
          next()
        })
      }
    } catch (error) {
      console.log("error updating groups",error)
    }
  }
 

  getStatisticsById = async (req,res,next)=>{
    try{
       

     let [types,turnover,recipes,sales] = await Promise.all([
       StatisticService.getAllSocietyByType(req.params.id),
       StatisticService.getAllSocietyByTurnOver(req.params.id),
       StatisticService.getRecipesByGroup(req.params.id),
       StatisticService.getSalesByGroup(req.params.id)
       ])

     for(let type of types){
       type.backgroundColor = this.geRandomValue(COLORS)
     }

     for(let item of turnover){
       item.backgroundColor = this.geRandomValue(COLORS)
     }

     const data = {
       types,
       turnover,
       recipes,
       sales
     }
     
     ResponseUtil.sendSuccess(res,data)
    }catch(err){
      console.log(err)
    }
  }
}
module.exports = new GroupController();
