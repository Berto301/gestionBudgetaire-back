
const requestService = require('../services/request');
const Bulles = require('../models/Admin')
const ResponseUtil = require("../utils/response/response");
const BULLES_EVENT = "reload_bulles"
class BullesController {
    constructor() { }

    insert = async (req, res, next) => {
        try {
            //console.log(req.body)
            const io = req.app.get('socket');
            const body = req.body
            // Check postes if alread exists
            const findBulles = await requestService.findOneBy(
                { title: body.title },
                Bulles
            );
            if (findBulles) {
                findBulles.title = body.title
                findBulles.value = body.value
                findBulles.status = body.status
                findBulles.contentHTML = body.contentHTML
                await findBulles.save()
                .then((_)=>{
                    io.emit(BULLES_EVENT);
                    ResponseUtil.sendSuccess(res, { _ , updated:true});
                })
                .catch(err => console.log(err))
            }else{
                await requestService
                .create(body, Bulles)
                .then((_)=>{
                    io.emit(BULLES_EVENT);
                    ResponseUtil.sendSuccess(res, { _ , created:true});
                })
                .catch(err=>console.log(err))
            }
        } catch (error) {
            console.log('Create Bulles', error);
            next(error);
        }
    };

    findAll =async (req,res)=>{
        try {
            await requestService.findAll({},Bulles)
            .then((response) => {
              ResponseUtil.sendSuccess(res, response);
            })
            .catch((error) => {
              console.log(error);
              ResponseUtil.sendError(res, error);
            });
        } catch (error) {
            console.log("Error on getting  candidature", error)
        }
    }

    
}
module.exports = new BullesController();