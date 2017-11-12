	'use strict';

	/*======================= importing all the files we need ==================================*/
	const helper = require('../../utils/helper');
	let config=require('../../config/app.config');

	module.exports = (request,response) => {
		try{
			let forgotPasswordResponse = {}
			
			helper.forgotPassword( request.body.email, request.body.password, (error,result)=>{

				if (error || result === null) {

					forgotPasswordResponse.error = config.response.true;
					forgotPasswordResponse.message = config.response.serverError;
					response.status(404).json(forgotPasswordResponse);
				}else{
					forgotPasswordResponse.error = config.response.false;
					forgotPasswordResponse.userId = result.result;
					forgotPasswordResponse.message = config.response.passwordUpdated;
					response.status(200).json(forgotPasswordResponse);
				}
			});
		}catch(error){
			response.json({status:config.response.false, message: config.response.serverErrors,data: error })
		}
	}
