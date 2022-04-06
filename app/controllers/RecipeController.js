const requestService = require("../services/request");
const Recipe = require("../models/Recipe");
const ResponseUtil = require("../utils/response/response");
const mongoose = require("mongoose");

class RecipeController {
  constructor() {}
  create = async (req, res, next) => {
    try {
      const { name } = req.body;
      const findRecipe = await requestService.findOneBy({ name }, Recipe);
      if (findRecipe?._id) {
        res.json({ success: false, findRecipe: true });
        next();
        return;
      }

      const recipesCreated = await requestService.create(req.body, Recipe);
      if (recipesCreated?._id) {
        ResponseUtil.sendSuccess(res, {
          success: true,
          message: "Recipe created",
        });
        next();
      }
    } catch (error) {
      console.log("Creation Recipe", error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { name } = req.body;
      const findRecipe = await requestService.findOneBy(
        { name, _id: { $ne: req.params.id } },
        Recipe
      );
      if (findRecipe?._id) {
        res.json({ success: false, findRecipe: true });
        next();
        return;
      }

      const RecipesCreated = await requestService.create(req.body, Recipe);

      if (RecipesCreated?._id) {
        ResponseUtil.sendSuccess(res, {
          success: true,
          message: "Recipe created",
        });
        next();
      }
    } catch (error) {
      console.log("Creation Recipe", error);
    }
  };

  delete = async (req, res, next) => {
    //const io = req.app.get('socket');
    await requestService
      .findOneAndDeleteBy({ _id: req.params.id }, Recipe)
      .then((response) => {
        // io.emit(GROUP_EVENT, response.Enterprise[0]);
        ResponseUtil.sendSuccess(res, {
          success: true,
          data: response,
          message: "Recipe Deleted",
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
      .findOneBy({ _id: req.params.id }, Recipe)
      .then((_recipeData) => {
        ResponseUtil.sendSuccess(res, { data: _recipeData });
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
}
module.exports = new RecipeController();
