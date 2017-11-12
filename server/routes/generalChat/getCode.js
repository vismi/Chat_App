  const helper = require('../../utils/helper');
//=======Exporting Module======================//
  module.exports=(request,response) =>{
    let id = request.params.codeId;
    let data={
      codeId:id
    }
    helper.getfromGeneralId(data,function(error,result){

      if(error){
       response.status(200).json(error);
     }
     else {                     
      response.status(200).json(result);
    }

  })

  }
