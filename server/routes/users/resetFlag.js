const helper = require('../../utils/helper');
//Exporting Module==========================//
module.exports=(request,response) =>{

	var data={
    toId:request.body.toId,
    fromId:request.body.fromId
  };
  helper.resetFlag(data,function(error,result){

    if(error){

      response.status(200).json(error);
    }
    else {

     response.status(200).json(result);
   }

 })


}