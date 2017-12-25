var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var goods = require('../models/goods');
var user = require('../models/user');

mongoose.connect('mongodb://localhost/shop');
// mongoose.connect('mongodb://69.171.74.143/shop');

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
  let currentPage = parseInt(req.param('page')) > 0 ? parseInt(req.param('page')) : 1;
  let pagesize = parseInt(req.param('pagesize')) > 0 ? parseInt(req.param('pagesize')) : 4;
  let skip = (currentPage - 1) * pagesize;
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
  goodsModel.sort({ 'salePrice': sort }).skip(skip).limit(pagesize).exec({},function (err, doc) {
      res.json({ status: "1", msg: '', result: doc })
  })
})
router.post('/addcart',function(req,res,next){
  var productId = req.body.productId;
  var userId = 100000077;

  user.findOne({userId:userId},function(err,userDoc){
    let goodsItem = '';
    userDoc.cartList.forEach(function(item){
      if(item.productId == productId){
        goodsItem = item;
        item.productNum ++;
      }
    })

    if(goodsItem){
      userDoc.save(function(err2,doc2){
        res.json({
          status: '0',
          msg: '',
          result: '商品数量添加成功'
        })
      })
    }else{
      goods.findOne({'productId':productId},function(err,goodsDoc){
        userDoc.cartList.push(goodsDoc);
        userDoc.save(function(err2,doc2){
          res.json({
            status:'0',
            msg:'',
            result:'加入购物车成功'
          })
        })
      })
    }
  })
})
module.exports = router;