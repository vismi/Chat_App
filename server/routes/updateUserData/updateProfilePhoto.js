/*===================== load all the files we need ========================================*/
'use strict';
const helper = require('../../utils/helper');
let bodyParser = require('body-parser');
var copyFile = require('quickly-copy-file');
let multer = require('multer');
var fs = require('fs');
let path =require('path');  
let variablefilename;

let config=require('../../config/app.config');
//Exporting module==============================//
module.exports = (request,response)=>{


	try{

		var dirname = path.resolve("../")+'/';
    const userId = request.params.id;
    
		let storage = multer.diskStorage({ //multers disk storage settings

      destination: function (req, file, cb) {
       cb(null, './uploads/profilePicture/');
     },
     filename: function (req, file, cb) {  
      let datetimestamp = Date.now();
      let filename = userId + '-'+ datetimestamp+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
      this.variablefilename=filename
      cb(null, filename);
    }

  });

		let upload = multer({ //multer settings
      storage: storage,
      fileFilter : function(req, file, callback) { //file filter

        if (['png','jpg'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
          return callback(new Error(config.response.wrong));
        }

        callback(null, true);
      }
    }).single('file');
		upload(request,response,function(err){
      if(err)
      {
        response.json({error_code:1,err_desc:err, message: config.response.errorEncountered});
      }
      let updateProfilePhotoResponse = {};

      let data ={$set:{"profilePhoto":response.req.file.filename}}
      let params = {"id": response.req.params.id}
      helper.updateUserData( params, data, (error,result)=>{

        if (error || result === null) {

          updateProfilePhotoResponse.error = config.response.true;
          updateProfilePhotoResponse.message = config.response.serverError;
          response.status(404).json(updateProfilePhotoResponse);
        }else{

          updateProfilePhotoResponse.error = config.response.false;
          updateProfilePhotoResponse.response = result;
          updateProfilePhotoResponse.message = config.response.userProfileUpdated;
          response.status(200).json(updateProfilePhotoResponse);
        }
      });

    })

  }catch(error){
    response.json({status:config.response.false, message: config.response.serverErrors,data: error })
  }

}



