const helper = require('../../utils/helper');

let config=require('../../config/app.config');
//Exporting Module===========================//
module.exports=(request,response) =>{

	let userId = request.body.userId;
	let sessionCheckResponse = {}

	if (userId == '') {

		sessionCheckResponse.error = config.responsetrue;
		sessionCheckResponse.message = config.response.emptyUserIdResponse;
		response.status(412).json(sessionCheckResponse);

	}else{

		helper.userSessionCheck( { 
			userId : userId,
		}, (error,result)=>{

			if (error || result === null) {

				sessionCheckResponse.error = config.responsetrue;
				sessionCheckResponse.message = config.response.serverError;
				response.status(503).json(sessionCheckResponse);
			}else{

				sessionCheckResponse.error = config.responsesfalse;
				sessionCheckResponse.username = result.username;
				sessionCheckResponse.reciever=result.reciever;
				sessionCheckResponse.message = config.response.login;
				if(result.profilePhoto){
					sessionCheckResponse.profilePhoto=result.profilePhoto;
				}
				response.status(200).json(sessionCheckResponse);
			}
		});
	}
}

