/*===================== load all the files we need ========================================*/
const express = require('express');
let uploadFileGeneral = require('./uploadFileGeneral');
let uploadFileOneOne = require('./uploadFileOneOne');

let router=express.Router();
/*=====================     providing routers    ========================================*/

router.post('/uploadFileGeneral/:username',uploadFileGeneral);
router.post('/uploadFileOneOne/:fromID/:toID',uploadFileOneOne);

module.exports=router;
