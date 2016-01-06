var router = require('express').Router()
  , rest = require("./utils/rest")
  , error_code = require("./utils/error")
  , _ = require("lodash")
  , utils = require("./utils/utils")
  , mailSender = require("./utils/email")
  ,async = require("async")
  ,store = require('./utils/store')
  , send = require("./utils/send");


module.exports = router;

// 创建 user ;
router.post("" , function(req ,res ){

  rest.response({
		method:"POST",
		uri:"/users",
	} , req , res )
})

// query user ;
router.get("" , function(req, res){
  req.query.sorts ="username";
  rest.query("/query/users", req.query , req , res)

})

// update user   by id
router.put("", function(req ,res){

  rest.response({
		method:"PUT",
		uri:"/users/"+ req.body.id
	}, req ,res)
})

// get num of all users ;
router.get("/total" , function (req ,res) {
    rest.response({
      uri:"/query/users",
      qs:{calc_sum :true }
    } , req , res )
})



//  send  email for verify  user's email ;   xxxxxxxx
//  req.body = { email: xxx }
// 验证 在 common 的  common/verifyemail 中;
router.post("/sendverifyemail" , function(req ,res){
  //send meail ;
  // to, subject , url , title1, title2 ,  buttontext ,  cb;
   var userid = req.session.user.id ;

  async.waterfall([
    // 发起邮件验证请求
    function (callback) {
      rest.doRest({
        method:"POST",
        uri:"/users/"+userid+"/verify/email/create"
      },req, callback )

    },

    function ( code , callback ) {

      var uuid = utils.uuid();  // uuid 来维护本地 session user ;
      mailSender.sendMail(
        req.body.email ,
        "Thinglinx 用户邮箱验证" ,
        "/#/access/verifyemail?code="+ code +"&v="+ uuid ,//+"&email="+ req.body.email   ,
        "点此按钮完成邮箱验证!",
        "请在30分钟内完成",
        "验证邮箱",
        function (err , info ) {
          if( err ){
            callback( error_code.SEND_MAILL_ERR );
          }else{
            store.put(uuid , { email: req.body.email , id: userid } );

            callback( null );
          }
        }
      )
    }


  ] , function (err , ret) {
      send(res, err , true );
  })


})


// 获取 session user 的  accesskey ;
router.get("/getack" , function (req ,res) {
    res.json( { ret: req.session.user.accesskey })
})


//verify user's  mobilePhone
router.post("/verifyphone" , function(req, res ){

  var _user2verify = req.body,
       session = req.session,
      verifyCode = session[ _user2verify.mobile_phone ];
  if( verifyCode == undefined ){
      send(res , error_code.NO_SEND_SMG  );
      return ;
  }

  if(  verifyCode != _user2verify.verifi ){
    send(res , error_code.SMS_VERIFY_ERR );
    return ;
  }

  // verify mobile_phone ;

  rest.doRest({
      method:"POST",
      uri:"/users/"+session.user.id+"/verify/mobile_phone",
  }, req , function ( err , ret ) {
      if(!err ){
         session.user.mobile_phone = req.body.mobile_phone;
         session.user.mobile_phone_verified = 1;
         session[_user2verify.mobile_phone]= undefined ;
      }
      send(res , err , ret );

  });


})


// getGroupsOfuser   获取user 所在的所有组;
router.get("/groups" , function(req ,res ){
  rest.response({
		uri:"/users/"+req.query.user_id +"/groups"
	} , req , res )
})


// 登出;
router.get("/logout" , function( req ,res){
	req.session.destroy();
	send( res,  null , true );

})

//  接收 sms , email  通知;
router.post("/notice" , function( req, res){


	var userid = req.session.user.id ;

  rest.doRest( {
		method:"PUT",
		uri:"/users/"+userid+"/activatenotice",
		body: req.body
	} , req , function (err , ret ) {
      if(! err ){
        _.extend( req.session.user , req.body );
      }
      send(res ,err , ret );
  } );
})

// 更改自己密码;
router.post("/pwdreset" , function( req , res ){
	var userid = req.session.user.id ;
  rest.response({
    method:"PUT",
		uri:"/users/"+userid+"/pwdreset"
	} , req, res)
})

// get account ;

router.get("/getaccount/:account_id" , function (req ,res ) {
    rest.inner({
        uri:"/accounts/" + req.params.account_id
    } , req , function (err , ret ) {
       send(res , err , ret );
    })

})



// get user's  account role

router.get("/getaccountrole/:user_id" , function (req ,res) {
    rest.response({
        uri:"/permission/users/" + req.params.user_id ,
        qs:{ isaccount:true }
    }, req ,res )
})

// 添加 account  或者 region 的  role ;
// account role =   /user_id ? isaccount:true,
// region role =   /user_id? region_id ;
// body ={ role_id: xx }
router.put("/addrole/:user_id" , function (req ,res) {

  rest.response({
    method:"PUT",
    uri:"/permission/users/" + req.params.user_id
  }, req ,res )

})

// 删除 account role ;  只删 account role ;
router.delete("/delrole/:user_id" , function (req ,res) {

   rest.response({
     method:"DELETE",
     uri:"/permission/users/"+ req.params.user_id,
      qs:{ isaccount:true}
   } , req ,res )

})



//  get  all  region roles ;

router.get( "/getpermissions/:user_id" , function (req ,res) {
  rest.response({
     uri:"/permissions/users/"+ req.params.user_id
  } , req ,res );
})


// req. query ={ region_id }
router.delete("/delpermissions/:user_id" , function (req, res) {
    rest.response({
      method:"DELETE",
      uri:"/permission/users/"+ req.params.user_id
    } , req ,res)

})

// 更改 user  region 的 role ;
router.put("/updatepermissions/:user_id" , function (req ,res) {
    rest.response({
        method:""
    } , req ,res);

})



// 删除 user ;
router.delete( "/:user_id" , function(req , res){

  rest.response({
    method:"DELETE",
    uri:"/users/"+req.params.user_id
  }, req ,res)
})

// getUserByid ,
router.get("/:user_id" , function(req , res){
  rest.response({
    uri:"/users/"+ req.params.user_id
  } , req, res)

})

