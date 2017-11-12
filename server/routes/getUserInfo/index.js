/*===================== load all the files we need ========================================*/
const express = require('express');
let getUserInfo = require('./getUserInfo');

let router=express.Router();
/*=====================     providing routers    ========================================*/
router.post('/',getUserInfo);

module.exports=router;
