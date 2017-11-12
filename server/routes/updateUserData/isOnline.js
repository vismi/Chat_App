/*===================== load all the files we need ========================================*/
'use strict';
const helper = require('../../utils/helper');

let config=require('../../config/app.config');

module.exports = (request,response)=>{
	try{

		let isOnlineResponse = {}

		let data ={$set:{"isActive":config.response.true}}
		let params = {"id": request.body.id}
		helper.updateUserData( params, data, (error,result)=>{

			if (error || result === null) {

				isOnlineResponse.error = config.response.true;
				isOnlineResponse.message = config.response.serverError;
				response.status(404).json(isOnlineResponse);
			}else{

				isOnlineResponse.error = config.response.false;
				isOnlineResponse.userId = result;
				isOnlineResponse.message = config.response.userOnline;
				response.status(200).json(isOnlineResponse);
			}
		});
		
	}catch(error){
		response.json({status:config.response.false, message:config.response.serverErrors,data: error })
	}

}

