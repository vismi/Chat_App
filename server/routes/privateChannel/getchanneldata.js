const helper = require('../../utils/helper');
//Exporting Module========================================//
module.exports=(request,response) =>{
  let channelId = request.body.channelId;

  
  if (channelId == '') {
    messages.error = true;
    messages.message = `userId cant be empty.`;
    response.status(200).json(messages);
  }else{

    helper.getChannelData( channelId, (error,result)=>{

      response.send(result);
      
    });
  }
}