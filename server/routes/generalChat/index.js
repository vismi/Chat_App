const express = require("express");
let addgeneral =require('./addGener');
let getgeneral=require('./getGeneral');
let getcode = require('./getCode');

let router=express.Router();

router.post('/',addgeneral);
router.get('/',getgeneral);
router.get('/Id/:codeId',getcode);
module.exports=router;