'use strict';
const helper = require('../../utils/helper');
//ExportingModule===================================//
module.exports=(request,response) =>{
    const data = {
        channelId:request.body.channelId.channelId,
        channelMessage:request.body.channelMessage,
        messageSender:request.body.messageSender,
        messageSenderName:request.body.messageSenderName,
        sendTime:Date.now()
    };
    helper.saveChannelMessage( data, (err,result)=>{
     response.send(result);
 });
}


