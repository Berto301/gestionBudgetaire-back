
const requestService = require('../services/request');
const Bulles = require('../models/Users')
const ResponseUtil = require("../utils/response/response");
const stream_users = "reload_users"
class BullesController {
    constructor() { }

    insert = async (req, res, next) => {
        try {
           console.log(req)
        } catch (error) {
            console.log('Create Users', error);
            next(error);
        }
    };

    findAll =async (req,res)=>{
        try {
            console.log(req)
        } catch (error) {
            console.log("Error on getting  Users", error)
        }
    }

    
}
module.exports = new BullesController();