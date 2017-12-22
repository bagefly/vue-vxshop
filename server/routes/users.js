var express = require('express');
var router = express.Router();
var user = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req,res,next){
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }

  console.log(param);

  user.findOne(param, function(err,doc){
    if(err){
      res.json({
        status: "1",
        msg: err.message
      })
    }else{
      if(!doc){
        res.json({
          status: "1",
          msg: "",
          result: "用户名和密码错误"
        })
      }
      res.cookie('userId',doc.userId,{
        path: '/',
        maxAge: 1000 * 60 * 60 *24
      })

      if(doc){
        res.json({
          status: 0,
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }
    }
  })
})
module.exports = router;
