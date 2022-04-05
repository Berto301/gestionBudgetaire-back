
  class RequestServive {
    constructor() {}
    /**
     *
     * @param {*} data
     * @param {*} models
     * insert data in database
     */
    create = (data, models) =>
      new Promise((resolve, reject) => {
        let Model = models;
        const datas = new Model(data);
        datas
          .save(datas)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    /**
     *
     * @param {*} condition
     * @param {*} models
     * find one result
     */
    findOneBy = (condition, models, population = null) =>
      new Promise((resolve, reject) => {
        let Model = models;
        Model.findOne(condition)
          .populate(population)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    /**
     *
     * @param {*} condition
     * @param {*} models
     * @param {*} population
     * retrieve all result
     */
    findAll = async (condition, Model, population = null) => {
      try {
        let responses = await Model.find(condition).populate(population);
        return responses;
      } catch (e) {
        throw new Error(e);
      }
    };
    
    findOneAndDeleteBy = (condition, models) =>
      new Promise((resolve, reject) => {
        let Model = models;
        Model.findOneAndDelete(condition)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    /**
     *
     * @param {*} _id
     * @param {*} models
     * delete items by id
     */
    deleteById = (_id, models) =>
      new Promise((resolve, reject) => {
        let Model = models;
        Model.findOneAndDelete(
          {
            _id,
          },
          { useFindAndModify: false }
        ).then((res) => {
          resolve(res);
        });
      });
    /**
     *
     * @param {*} _id
     * @param {*} data
     * @param {*} models
     * update data by id
     */
    updateById = (_id, data, models, isNew = true) =>
      new Promise((resolve, reject) => {
        let Model = models;
        Model.findOneAndUpdate(
          { _id },
          { $set: data },
          { new: isNew, useFindAndModify: false }
        )
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
  
    /**
     *
     * @param {*} condition
     * @param {*} Models
     * delete many
     */
    deleteManyby = (condition, models) =>
      new Promise((resolve, reject) => {
        let Models = models;
        console.log(Models);
        Models.deleteMany(condition)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    deleteMany = (condition, models) =>
      new Promise((resolve, reject) => {
        if (Array.isArray(models)) {
          models.map((Model) => {
            Model.deleteMany(condition, function (err) {
              if (err) return reject(err);
              resolve(true);
            });
          });
        }
      });
  }
  module.exports = new RequestServive();
  