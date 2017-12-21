var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  'userId':String,
  'userName':String,
  'orderList':Array,
  'cartList':[{
    "productId":String,
    "productName":String,
    "salePrice":Number,
    "productImage":String,
    "productNum":String,
  }]
})

module.exports = mongoose.model("user",userSchema);