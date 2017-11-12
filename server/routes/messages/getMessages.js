const helper = require('../../utils/helper');

let config=require('../../config/app.config');
//Exporting Modulle============================//
module.exports=(request,response) =>{

	let userId = request.body.userId;
	let toUserId = request.body.toUserId;
	let messages = {}

	if (userId == '') {
		messages.error = config.response.true;
		messages.message = config.response.userIdEmpty;
		response.status(200).json(messages);
	}else{

		helper.getMessages( userId, toUserId, (error,result)=>{

			if (error) {

				messages.error = config.response.true;
				messages.message = config.response.serverError;
				response.status(200).json(messages);

			}else{

				messages.error = config.response.false;
				messages.messages = result;
				response.status(200).json(messages);
			}
		});
	}
}
