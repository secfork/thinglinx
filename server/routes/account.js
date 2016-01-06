var router = require('express').Router()
  , key = require("./utils/sessionkey")
  , send = require("./utils/send")
  , async = require('async')
  , _ = require("lodash")
  , email = require("./utils/email")
  , store = require("./utils/store")
  , utils = require("./utils/utils")
  , error_code = require("./utils/error")
  , rest = require("./utils/rest");


module.exports = router;

// getAccount By id
router.get("" , function(req, res){
    rest.response({
      uri:"/accounts/"+ req.query.account_id
    } , req, res )
});



// create Account step 1 ;
//  req.body = {  name  ,  admin : { email } }
// 1:  verify  identifyCode ;
// 2:  verify  acitveNo ,
// 3:  send  email ;
router.post("", function (req, res) {
  var session = req.session
    , account_  = req.body
    , idetify_ = account_.identifyCode
    , session_idetify_ = session[key.IDENTIFY_C_ACCOUNT] ;


  if ( !session_idetify_  ||   session[key.IDENTIFY_C_ACCOUNT] != idetify_ ) {
   send(res, error_code.IDENTIFY_ERR);
   return;
  }

  // verify accountname ;

  async.waterfall([
    // verify accountname ,
    function (callback) {
      rest.inner({
        method: "POST",
        uri: "/signin/verify/account",
        body: {account: req.body.name}
      }, req , callback )
    },
    //verify invitation_code ,
    function (  ret , callback) {
      rest.inner({
        method: "POST",
        uri: "/signin/verify/code",
        body: {invitation_code: req.body.invitation_code}
      }, req , callback)
    },
    // send regist email ,
    function ( ret , callback) {
      // xxxxxxxxxxxxxxxx   email  =  req.body = {  name , invitation_code ,  admin: { eamil }}
       var uuid = utils.uuid(),
           url = "/#/access/signup?v=" +uuid ;

        email.sendMail( account_.admin.email ,
                        "继续完成您的ThingLinx帐号注册" ,
                        url,
                        "请确认您的邮箱，只差一步，您的注册就成功了！",
                        "请在30分钟内完成" ,
                        "完成注册",
                        function( err ,info){
                            if( err ){
                                callback( error_code.SEND_MAILL_ERR)
                            }else{
                                store.put( uuid , account_ ) ;
                                callback(null)
                            }

                        }
                    );


    }


  ], function (err, ret) {

    send(res, err, true );

  })


})


// create Account step 2 ;
// create account ;
router.post("/admin", function (req, res) {


  async.waterfall([
    // 获取 account2create 缓存;
    function (callback ) {
        store.get(req.query.uuid , function ( err , data  ) {
            if( err ){
                callback( error_code.PAGE_EXPIRE );
            } else{
                callback( null , data );
            }
        })

    },

    function ( account2create_  , callback) {

        _.extend( account2create_.admin, { email_verified:1 } ,  req.body );

        account2create_.add_alarm_space = true ;

        // create account ;
        rest.inner({
          method: "POST",
          uri: "/accounts",
          body: account2create_
        }, req  , function (err , ret ) {
            if(!err ){
                store.remove(req.query.uuid )
            }
            callback(err ,ret );

        })

    }

  ], function (err , ret) {
      send(res , err, ret )
  })




})






