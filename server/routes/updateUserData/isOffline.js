/*===================== load all the files we need ========================================*/
'use strict';
const helper = require('../../utils/helper');

let config=require('../../config/app.config');

module.exports = (request,response)=>{
	try{

		let isOfflineResponse = {}
		let data ={$set:{"isActive":config.response.false}}
		let params = {"id": request.body.id}
		helper.updateUserData( params, data, (error,result)=>{

			if (error || result === null) {

				isOfflineResponse.error = config.response.true;
				isOfflineResponse.message = config.response.serverError;
				response.status(404).json(isOfflineResponse);
			}else{
	           			//console.log(result)
	           			isOfflineResponse.error = config.response.false;
	           			isOfflineResponse.userId = result;
	           			isOfflineResponse.message = config.response.userOffline;
	           			response.status(200).json(isOfflineResponse);
	           		}
	           	});
		
	}catch(error){
		response.json({status:config.response.false, message: config.response.serverErrors,data: error })
	}

}

