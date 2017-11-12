const express = require("express");
let getregisteredusers =require('./fetchregisteredusers');
let addchannel=require('./addchannel');
let getchanneldata=require('./getchanneldata');
let router=express.Router();
let addchannelmessage=require('./addChannelMessage');
router.get('/getregisteredusers',getregisteredusers);
router.post('/getchannelinfo',getchanneldata);
router.post('/addchannel',addchannel);
router.post('/addchannelmessage',addchannelmessage)
module.exports=router;