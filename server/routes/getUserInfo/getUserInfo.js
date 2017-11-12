	'use strict';
	/*===================  load up the user model ==============================================*/
	const helper = require('../../utils/helper');
	let config=require('../../config/app.config');
	//Exporting Module============================//
	module.exports = (request,response)=>{
		try{
			let getUserInfoResponse = {};
			helper.getUserInfo( request.body.id, (error,result)=>{

				if (error || result === null) {

					getUserInfoResponse.error = config.response.true;
					getUserInfoResponse.message = config.response.serverError;
					response.status(404).json(getUserInfoResponse);
				}else{
					
					getUserInfoResponse.error = config.response.false;
					getUserInfoResponse.result = result;
					getUserInfoResponse.message = config.response.queryComplete;
					response.status(200).json(getUserInfoResponse);
				}
			});


		}catch(error){
			res.json({status:config.response.false, message: config.response.serverErrors,data: error })
		}
	}
