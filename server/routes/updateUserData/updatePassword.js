'use strict';
const helper = require('../../utils/helper');
let config=require('../../config/app.config');
module.exports = (request,response)=>{
	try{
		
		let updatePasswordResponse = {}

		let data ={$set:{"password":request.body.newPassword}}
		let params = {"id": request.body.id, "oldPassword":request.body.oldPassword}
		helper.updateUserData( params, data, (error,result)=>{


			if (error || result === null) {

				updatePasswordResponse.error = config.response.true;
				updatePasswordResponse.message = config.response.serverError;
				response.status(404).json(updatePasswordResponse);
			}else{
				updatePasswordResponse.error = config.response.false;
				updatePasswordResponse.userId = result;
				updatePasswordResponse.message = config.response.contactUpdated;
				response.status(200).json(updatePasswordResponse);
			}
		});
	}catch(error){
		res.json({status:config.response.false, message: config.response.serverErrors,data: error })
	}

}