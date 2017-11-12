const helper = require('../../utils/helper');
module.exports=(request,response) =>{
	 helper.getUserInfo(request.body.id,function(error,result){
	 	
                if(error){

                        response.status(200).json(error);
                }
                else {
                       
                       response.status(200).json(result);
                   }

            })



}