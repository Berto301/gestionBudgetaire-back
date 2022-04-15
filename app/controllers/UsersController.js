const requestService = require("../services/request");
const Users = require("../models/Users");
const Group = require("../models/Group");
const Society = require("../models/Society");
const ResponseUtil = require("../utils/response/response");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../config/secretKeys");
const UsersServices = require("../services/users.service")

const stream_users = "reload_information";
class UsersController {
  constructor() {}

  getById = async (req, res, next) => {
    try {
      const {id} = req.params
      if(!id) return ResponseUtil.sendError(res,{
        message: "Users not found",
      })
      const users = await UsersServices.getById(id)
      if(users?.[0]?._id){
        ResponseUtil.sendSuccess(res,{users:users?.[0]})
      }
    } catch (error) {
      console.log("errors on getting data users",error)
    }
  };

  updateById = async (req,res,next)=>{
    try {
      const io = req.app.get('socket');
      const {id} = req.params
      if(!id) return res.json({success:false,message:"Users not found"})
      const usersFinded = await requestService.findOneBy({ _id: id }, Users)
      const{name,email,phone,firstname , photoId} = req.body
      if(usersFinded?._id){
        usersFinded.name= name
        usersFinded.email = email
        usersFinded.phone = phone
        usersFinded.firstname = firstname
        usersFinded.photoId = photoId || null

        console.log(usersFinded)
        await usersFinded.save()
        .then((users)=>{
          ResponseUtil.sendSuccess(res,users)
          io.emit("reload_information",users?.groupId)
          next()
        })
      }
    } catch (error) {
      console.log("error updating groups",error)
    }
  }
  register = async (req, res, next) => {
    try {
      const { users:userData, groups:groupData, society:societyData } = req.body;
      const io = req.app.get('socket');
      if (!userData && (!groupData || !societyData)) {
        return ResponseUtil.sendError(res, {
          message: "Please enter informations",
        });
      }
      let groupCreated = {},
        societyCreated = {},
        groupUpdated = {},
        societyUpdated = {},
        userCreated = {},
        userUpdated = {},
        data = {};
      if (groupData?.name) {
        if (groupData?._id) {
          groupUpdated = await requestService.updateById(
            groupData?._id,
            groupData,
            Group
          ); // update group
          data.group = groupUpdated;
        } else {
          groupCreated = await requestService.create(groupData, Group); // creation group
          data.group = groupCreated;
        }
      }

      if (societyData?.name) {
        if (societyData?._id) {
          societyUpdated = await requestService.updateById(
            societyData?._id,
            societyData,
            Society
          ); // update society
          data.society = societyUpdated;
        } else {
          societyCreated = await requestService.create(societyData, Society); // creation society
          data.society = societyCreated;
        }
      }

      /*Creation users*/
      const dataUser = {
        ...userData,
        groupId:groupCreated?._id || groupData?._id || groupUpdated?._id || societyData?.groupId || null,
        societyId:societyCreated?._id || societyData?._id || societyUpdated?._id || null
      };
      if (userData?._id) {
        userUpdated = await requestService.updateById(
          dataUser?._id,
          dataUser,
          Users
        );
        data.users = userUpdated;
      } else {
        //verification email 
        const userFinded = await requestService.findOneBy({email:userData.email},Users)

        if(userFinded?._id){
          // delete group and Society created if there as an error 
          if(groupCreated?._id || societyCreated?._id){
            await Promise.all([
              requestService.findOneAndDeleteBy({_id:groupCreated?._id},Group),
              requestService.findOneAndDeleteBy({_id:societyCreated?._id},Society)
           ])
          }
          

          return res.json({success:false,message:"Email already in used with an users"})
        }
        /**Cryptage password */
        const salt = await bcrypt.genSalt(); //generator 
        const passwordHash = await bcrypt.hash(userData.password, salt);
        //change password to hash
        dataUser.password = passwordHash
        /**End cryptage*/
        userCreated = await requestService.create(dataUser, Users);
        data.users = userCreated;

        /*Update society*/
        if(!societyData?.adminId){
            if(societyUpdated?._id || societyCreated?._id){
              const societyToUpdate = await requestService.findOneBy({_id:societyUpdated?._id || societyCreated?._id},Society)
              if(societyToUpdate?._id){
                societyToUpdate.adminId = userCreated?._id
                await societyToUpdate.save()
              }
            }  
        }

      }
      if (data?.users && (data?.group || data?.society)) {
        ResponseUtil.sendSuccess(res, {
          message: "Account created",
          success: true,
          data,
        });
        io.emit("reload_information",data?.users?.groupId)
        next();
        return;
      }
    } catch (error) {
      console.log("Error register ", error);
    }
  };

  login = async (req, res, next) => {
    try {
      try {
        const { email, password } = req.body;
        const users = await requestService.findOneBy({ email }, Users);
        if (!users) {
          res.json({ message: "Email not found", success: false });
        } else {
          const isPasswordsSame = await bcrypt.compareSync(
            password,
            users.password
          ); //compare password
          if (isPasswordsSame) {
            let payload = {
              id: users?._id,
              username: users?.name + " " + users?.firstname,
            };
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926, // 1 year in seconds
              },
              (err, token) => {
                if (err) {
                  res.json({ success: false, message: "Connexion error" });
                }
                res.json({ success: true, token: token, users }); // Passport [send token]
                next();
              }
            );
          } else {
            res.json({ success: false, message: "Invalid password" });
            next();
          }
        }
      } catch (error) {
        console.log("error on login for users", { error });
        ResponseUtil.sendError(res, error);
      }
    } catch (error) {
      console.log("Error login ", error);
    }
  };
}
module.exports = new UsersController();
