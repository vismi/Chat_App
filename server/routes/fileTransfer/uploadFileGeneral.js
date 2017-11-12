 /*===================== load all the files we need ========================================*/
  'use strict';
  const helper = require('../../utils/helper');
  let bodyParser = require('body-parser');
  let multer = require('multer');
  var fs = require('fs');  
  let variablefilename;
  let config=require('../../config/app.config');

  module.exports = (request,response)=>{
    
  	try{

  		let finalData
      const userId = request.params.username;
  		let storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {

         cb(null, './uploads/files');
       },
       filename: function (req, file, cb) {  
        
        let datetimestamp = Date.now();
        let filename = file.fieldname + '-'+ userId + '-'+ datetimestamp +'.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        this.variablefilename=filename
        
        cb(null, filename);
      }

    });

  		let upload = multer({ //multer settings
        storage: storage,
        fileFilter : function(req, file, callback) { //file filter
          if (['png','jpg','mp3','mp4', 'pdf', 'txt'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error(config.response.wrong));
          }

          callback(null, config.response.true);
        }
      }).single('file');


  		upload(request,response,function(err){
        if(err)
        {
          response.json({error_code:1,err_desc:err, message: config.response.errorEncountered});
        }
        //console.log(response.req.file)
        let updateProfilePhotoResponse = {}
        let fileSize = parseFloat(response.req.file.size/(1024*1024)).toFixed(2)
        let originalName =response.req.file.originalname
        let path = response.req.file.filename
        let mimeT = response.req.file.mimetype
        let data ={
          "username":response.req.params.username,
          "timestamp":Date.now(),
          "file":{
            "fileSize":fileSize,
            "fileOriginalName":originalName,
            "filePath":path,
            "fileMIME":mimeT}
          }
          finalData = data
          let params = {"username": response.req.params.username}
          helper.uploadFileGeneral( data, (error,result)=>{

            if (error || result === null) {
              updateProfilePhotoResponse.error = config.response.true;
              updateProfilePhotoResponse.message = config.response.serverError;
              response.status(404).json(updateProfilePhotoResponse);
            }else{
              updateProfilePhotoResponse.error = config.response.false;
              updateProfilePhotoResponse.response = {"status":result.result, "finalData":finalData};
              updateProfilePhotoResponse.message = config.response.fileUploaded;
              response.status(200).json(updateProfilePhotoResponse);
            }
          });
        })  

    }catch(error){
      response.json({status:config.response.false, message: config.response.serverErrors,data: error })
    }
  }



