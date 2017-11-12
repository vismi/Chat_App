//import express from 'express';
'use strict';

const helper = require('../../utils/helper');

let config=require('../../config/app.config');
//Importing Module===========================//
module.exports=(request,response) =>{

	const data = {
		username : (request.body.username).toLowerCase(),
		email : request.body.email,
		password : request.body.password
	};

	let registrationResponse = {}

	if(data.username === '') {

		registrationResponse.error = config.response.true;
		registrationResponse.message = config.response.failure;
		response.status(412).json(registrationResponse);

	}else if(data.email === ''){

		registrationResponse.error = config.response.true;
		registrationResponse.message = config.response.emailFailure;
		response.status(412).json(registrationResponse);

	}else if(data.password === ''){

		registrationResponse.error = config.response.true;
		registrationResponse.message = config.response.passwordFailure;
		response.status(412).json(registrationResponse);

	}else{

		data.timestamp = Math.floor(new Date() / 1000);
		data.online = 'Y' ;
		data.socketId = '' ;

		helper.registerUser( data, (error,result)=>{

			if (error) {

				registrationResponse.error = config.response.true;
				registrationResponse.message = config.response.serverError;
				response.status(404).json(registrationResponse);
			}else{

				registrationResponse.error = config.response.false;
				registrationResponse.userId = result.insertedId;
				registrationResponse.message = config.response.success;
				response.status(200).json(registrationResponse);
			}
		});
	}
}
