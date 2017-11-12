'use strict';

const helper = require('../../utils/helper');

let config=require('../../config/app.config');
module.exports=(request,response) =>{

	const data = {
		username : (request.body.username).toLowerCase(),
		password : request.body.password
	};

	let loginResponse = {}

	if(data.username === '' || data.username === null) {

		loginResponse.error = config.response.true;
		loginResponse.message = config.response.failure;
		response.status(412).json(loginResponse);

	}else if(data.password === '' || data.password === null){
		
		loginResponse.error = config.response.true;
		loginResponse.message = config.response.passwordFailure;
		response.status(412).json(loginResponse);

	}else{

		helper.login( data, (error,result)=>{

			if (error || result === null) {

				loginResponse.error = config.response.true;
				loginResponse.message = config.response.serverError;
				response.status(404).json(loginResponse);
			}else{
				loginResponse.error = config.response.false;
				loginResponse.userId = result._id;
				loginResponse.message = config.response.login;
				response.status(200).json(loginResponse);
			}
		});
	}
}
