const requestService = require("../services/request");
const DataImage =require('../models/DataImage')
const ResponseUtil = require("../utils/response/response");

class DataImageController {
  constructor() {}

 uploadImage =  async (req,res,next)=>{
    const io = req.app.get('socket');
    const url = req.protocol + '://' + req.get('host')
    const photoImage = new DataImage({
        source: req.body.source,
        location: url + '/public/' + req.file.filename,
        sourceModel: req.body.sourceModel,
        name:req.file.filename,
        mimetype:req.file.mimetype,
        size:req.file.size

    });
    await requestService.findOneAndDeleteBy({source:req.body.source},DataImage) // delete existing file for user
    await photoImage.save().then(result => {
      ResponseUtil.sendSuccess(res,result)
      io.emit("reload_information",req.body.groupId)
       next()
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
}
// getImage = async(req,res,next)=>{
//     const {id} = req.params

// }
}
module.exports = new DataImageController();
