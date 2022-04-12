const requestService = require("../services/request");
const RecipeBySociety = require("../models/RecipeBySociety");
const ResponseUtil = require("../utils/response/response");
const mongoose = require("mongoose");
const RecipeService = require("../services/recipe.service")

class RecipeController {
  constructor() {}
  create = async (req, res, next) => {
    try {
      const io = req.app.get('socket');
      const recipesCreated = await requestService.create(req.body, RecipeBySociety);
      if (recipesCreated?._id) {
        ResponseUtil.sendSuccess(res,recipesCreated);  
        io.emit("reload_information_society",recipesCreated?.societyId)
        next();
      }
    } catch (error) {
      console.log("Creation RecipeBySociety", error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { name,_id } = req.body;
      const io = req.app.get('socket');
      const findRecipe = await requestService.findOneBy(
        { name, _id: { $ne: req.params.id } },
        RecipeBySociety
      );
      if (findRecipe?._id) {
        res.json({ success: false, message:"Name already used"});
        next();
        return;
      }
      const recipesUpdated = await requestService.updateById({_id},req.body,RecipeBySociety);

      if (recipesUpdated?._id) {
        ResponseUtil.sendSuccess(res, recipesUpdated);
        io.emit("reload_information_society",recipesUpdated?.societyId)
        next();
      }
    } catch (error) {
      console.log("Update Recipe", error);
    }
  };

  delete = async (req, res, next) => {
    const io = req.app.get('socket');
    /* verification if a recipe is in relation with a society*/

    //end verification
    await requestService
      .findOneAndDeleteBy({ _id: req.params.id }, RecipeBySociety)
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

  getById = async (req, res, next) => {
    await requestService
      .findOneBy({ _id: req.params.id }, RecipeBySociety)
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
      const data = await RecipeBySociety
      .find({societyId:mongoose.Types.ObjectId(req.params.id)})
      .populate("recipeId")
      //await RecipeService.getAllRecipesBy(req.params.id)
      // await RecipeBySociety
      // .find({societyId:mongoose.Types.ObjectId(req.params.id)})
      // .populate("recipeId")

      console.log(data)
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
        RecipeBySociety
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
