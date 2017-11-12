const express = require("express");
let setFlag=require('./setFlag');
let resetFlag=require('./resetFlag');

let userInfo=require('./userInfo');
let channelData=require('./getChannelData');
let router=express.Router();
router.post('/',setFlag);
router.put('/',resetFlag);
router.post('/getuserdata',userInfo);
router.post('/getChanneldata',channelData);

module.exports=router;