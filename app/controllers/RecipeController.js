const requestService = require("../services/request");
const Recipe = require("../models/Recipe");
const ResponseUtil = require("../utils/response/response");
const mongoose = require("mongoose");

class RecipeController {
  constructor() {}
  create = async (req, res, next) => {
    try {
      const io = req.app.get('socket');
      const { name } = req.body;
      const findRecipe = await requestService.findOneBy({ name }, Recipe);
      if (findRecipe?._id) {
        res.json({ success: false, message:"Name already used"});
        next();
        return;
      }

      const recipesCreated = await requestService.create(req.body, Recipe);
      if (recipesCreated?._id) {
        ResponseUtil.sendSuccess(res,recipesCreated);  
        io.emit("reload_information",recipesCreated?.groupId)
        next();
      }
    } catch (error) {
      console.log("Creation Recipe", error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { name,_id } = req.body;
      const io = req.app.get('socket');
      const findRecipe = await requestService.findOneBy(
        { name, _id: { $ne: req.params.id } },
        Recipe
      );
      if (findRecipe?._id) {
        res.json({ success: false, message:"Name already used"});
        next();
        return;
      }
      const recipesUpdated = await requestService.updateById({_id},req.body,Recipe);

      if (recipesUpdated?._id) {
        ResponseUtil.sendSuccess(res, recipesUpdated);
        io.emit("reload_information",recipesUpdated?.groupId)
        next();
      }
    } catch (error) {
      console.log("Creation Recipe", error);
    }
  };

  delete = async (req, res, next) => {
    const io = req.app.get('socket');
    /* verification if a recipe is in relation with a society*/

    //end verification
    await requestService
      .findOneAndDeleteBy({ _id: req.params.id }, Recipe)
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
      .findOneBy({ _id: req.params.id }, Recipe)
      .then((_recipeData) => {
        ResponseUtil.sendSuccess(res,  _recipeData );
        next();
      })
      .catch((error) => {
        console.log(error);
        ResponseUtil.sendError(res, error);
        next(error);
      });
  };

  getRecipeBySociety = async (req, res, next) => {
    try {
      const data = await requestService.findOneBy(
        { societyId: mongoose.Types.ObjectId(req.params.id) },
        Recipe
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
        Recipe
      );
      ResponseUtil.sendSuccess(res, data);
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
module.exports = new RecipeController();
