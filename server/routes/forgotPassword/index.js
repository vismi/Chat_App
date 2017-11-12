/*===================== load all the files we need ========================================*/
const express = require('express');
let forget = require('./forget');
let change = require('./change');

let router=express.Router();

/*=====================     providing routers    ========================================*/

router.put('/',change);
router.get('/:email',forget);

module.exports=router;