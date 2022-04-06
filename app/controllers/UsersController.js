const requestService = require("../services/request");
const Users = require("../models/Users");
const Group = require("../models/Group");
const Society = require("../models/Society");
const ResponseUtil = require("../utils/response/response");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../config/secretKeys");

const stream_users = "reload_users";
class UsersController {
  constructor() {}

  getById = async (req, res, next) => {};
  register = async (req, res, next) => {
    try {
      const { userData, groupData, societyData } = req.body;

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
        if (groupData?._id) {
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
        ...societyData,
        //groupId:groupCreated?._id || groupData?._id || groupUpdated?._id || null,
        //societyId:societyCreated?._id || societyData?._id || societyUpdated?._id || null
      };
      if (userData?._id) {
        userUpdated = await requestService.updateById(
          dataUser?._id,
          dataUser,
          Users
        );
        data.users = userUpdated;
      } else {
        userCreated = await requestService.create(dataUser, Users);
        data.users = userCreated;
      }
      if (data?.users && (data?.group || data?.society)) {
        ResponseUtil.sendSuccess(res, {
          message: "Account created",
          success: true,
          data,
        });
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
            res.json({ success: false, message: "Invalid passowrd" });
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
