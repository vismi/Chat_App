	/*===================== load all the files we need ========================================*/
	'use strict';
	/*===================  load up the config file ==============================================*/
	const helper = require('../../utils/helper');
	let config=require('../../config/app.config');

	module.exports = (request,response) => { 
		
	//Calling find function
	try
	{
		let verifyForgotPasswordResponse = {};
		helper.verifyForgotPassword( request.params.email, (error,result)=>{

			if (error || result === null) {

				verifyForgotPasswordResponse.error = config.response.true;
				verifyForgotPasswordResponse.message = config.response.serverError;
				response.status(404).json(verifyForgotPasswordResponse);
			}else{
				verifyForgotPasswordResponse.error = config.response.false;
				verifyForgotPasswordResponse.result = result;
				verifyForgotPasswordResponse.message = config.response.queryComplete;
				response.status(200).json(verifyForgotPasswordResponse);
			}
		});

	}catch(error){
		response.json({status:config.response.false, message: config.response.serverForget,data: error })
	}
	}





