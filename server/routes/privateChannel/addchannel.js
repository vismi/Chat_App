'use strict';

const helper = require('../../utils/helper');
//Exporting Module============================//
module.exports=(request,response) =>{
        const data = {
        channelName:request.body.channelName,
        channelPurpose:request.body.channelPurpose,
        channelMembers:request.body.channelMembers

    };
    let registrationResponse = {}
    helper.saveChannel( data, (err,result)=>{
     response.send(result);
 });
} 