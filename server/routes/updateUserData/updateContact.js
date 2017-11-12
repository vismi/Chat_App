
/*===================== load all the files we need ========================================*/
'use strict';
const helper = require('../../utils/helper');

let config=require('../../config/app.config');

module.exports = (request,response)=>{
	try{

		let updateContactResponse = {}
		let data ={$set:{"contact":request.body.contact}}
		let params = {"id": request.body.id}
		helper.updateUserData( params, data, (error,result)=>{


			if (error || result === null) {

				updateContactResponse.error = config.response.true;
				updateContactResponse.message = config.response.serverError;
				response.status(404).json(updateContactResponse);
			}else{
				
				updateContactResponse.error = config.response.false;
				updateContactResponse.userId = result;
				updateContactResponse.message = config.response.contactUpdated;
				response.status(200).json(updateContactResponse);
			}
		});
		
	}catch(error){
		response.json({status:config.response.false, message: config.response.serverErrors,data: error })
	}

}

