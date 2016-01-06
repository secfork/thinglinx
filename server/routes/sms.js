var router = require('express').Router(),
  smsSender = require("./utils/sms"),
  send= require( "./utils/send"),
  rest = require("./utils/rest");


module.exports = router;

//  发送 用户手机 校验 验证码;
// req .query.mobile_phone ;
router.get("/user" , function (req ,res) {

  var  phoneNo = req.query.mobile_phone ;
    smsSender( phoneNo , function ( err ,  verifyNo ) {
        // session { mobile_phone :  verifyNo }
        if( verifyNo ){
            req.session[ phoneNo ] = verifyNo ;
        }

        send( res , err ,   true );

    })

})
