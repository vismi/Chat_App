
/*===================== load all the files we need ========================================*/
'use strict';
const helper = require('../../utils/helper');

let config=require('../../config/app.config');

module.exports = (request,response)=>{
	
	try{

		let updateStatusResponse = {}
		let data ={$set:{"status":request.body.status}}
		let params = {"id": request.body.id}
		helper.updateUserData( params, data, (error,result)=>{

	           		if (error || result === null) {

	           			updateStatusResponse.error = config.response.true;
	            		updateStatusResponse.message = config.response.serverError;
	           			response.status(404).json(updateStatusResponse);
	           		}else{
	           			updateStatusResponse.error = config.response.false;
	           			updateStatusResponse.userId = result;
	            		updateStatusResponse.message = config.response.statusUpdated;
	           			response.status(200).json(updateStatusResponse);
	           		}
				});
		
}catch(error){

  response.json({status:config.response.false, message: config.response.serverErrors,data: error })

}
}

