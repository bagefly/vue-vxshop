var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var goods = require('../models/goods');

// mongoose.connect('mongodb://localhost/shop');
mongoose.connect('mongodb://localhost/shop');

mongoose.connection.on('connected',function(){
  console.log("mongodb connected sucssess");
})

mongoose.connection.on('error',function(){
  console.log("mongodb connected error");
})

mongoose.connection.on('disconnected',function(){
  console.log("mongodb connected disconnected");
})


router.get('/list',function(req,res,next){
  let priceLevel = req.param('priceLevel');
  let sort = req.param('sort') ? req.param('sort') : 'all';
  
  let param = {};
  if(priceLevel != 'all'){
    let priceItem = [
      [0,100],
      [100,500],
      [500,1000],
      [1000,2000]
    ];
    param = {
      salePrice:{
        $gt:priceItem[priceLevel][0],
        $lte:priceItem[priceLevel][1]
      }
    }
  }
  let goodsModel = goods.find(param);
  goodsModel.sort({ 'salePrice': sort }).exec({},function (err, doc) {
      res.json({ status: "1", msg: '', result: doc })
  })
})

module.exports = router;