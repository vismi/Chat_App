const express = require("express");
const helper = require('../../utils/helper');
let config=require('../../config/app.config');
module.exports=(request,response) =>{

	if (request.body.username === "") {
		response.status(412).json({
			error : config.response.true,
			message : config.response.failure
		});
	} else {
		helper.userNameCheck( {
			username : request.body.username.toLowerCase()
		}, (count)=>{

			let result = {};
			
			if (count > 0) {
				result.error = config.response.true;
			} else {
				result.error = config.response.false;
			}
			response.status(200).json(result);
		});
	}
}
