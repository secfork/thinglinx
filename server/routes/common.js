
(function () {


var router = require('express').Router()
  , rest = require("./utils/rest")
  , send = require("./utils/send")
  , error_code = require("./utils/error")
  , _ = require("lodash")


  , config = require("../config")

  , store = require("./utils/store")
  , async = require("async")

  , canViewPanel = require("../config/view_panel")

  , captcha = require("./utils/captcha")

  , utils = require("./utils/utils")
  , email = require("./utils/email")
  , session_key = require("./utils/sessionkey")
  , base64 = require("base64-js")

  ;


module.exports = router;


//islogined
router.get('/islogined', function (req, res) { 
  res.json({ret: ( req.session && req.session.user )  || false} )
});

router.get("/logintimes", function (req, res) {
  res.json({
    ret: !!req.session[session_key.IDENTIFY_LOGIN]
  })
})

// login ;
router.post('/login', function (req, res) {
  var session = req.session,
    request_user = req.body;


  if (req.session.user) {

    send(res, error_code.LOGIN_YET);
    return;
  }

  // 登录次数;
  var logintimes = session[session_key.LOGIN_TIMES] || 0,

  // 图片验证码;
    verify = session[session_key.IDENTIFY_LOGIN];

  if (verify) {

    if (verify != request_user.verifi) {
      send(res, error_code.IDENTIFY_ERR); // 验证码 无效;
      return;
    }

  }

  async.waterfall([

    // 申请 , accesskey
    function (callback) {

      rest.apllyAccessKey(req.body, function (err, httpResponse, data) {
        if (err) {
          callback("rest_err");
          return;
        }
        if (data.err) {
          callback(data.err);
          return;
        }

        request_user.accesskey = data.ret.accesskey;
        request_user.accesskey_expires = data.ret.expires - 60000 * config.applykey_offset;

        session.user = request_user;
        session.user.viewPanel = canViewPanel.indexOf(request_user.account) >= 0;

        callback(null, data.ret.user_id);

      })

    },
    // 获取用户
    function (user_id, callback) {
      rest.doRest({
        uri: "/users/" + user_id,
      }, req, function (err, retdata) {
        if (err) {
          return callback(err)
        }
        console.log(" uuuuu", retdata)
        _.extend(session.user, retdata);
        callback(null);
      })
    },

    // 修改登录时间;
    function (callback) {
      // https.doRest(  {
      // 	uri:""
      // })

      callback(null)

    }

  ], function (err, ret) {
    if (err) {

      session[session_key.LOGIN_TIMES] = ++logintimes;

      if (logintimes > 2) {
        var ary = captcha.get();

        session[session_key.IDENTIFY_LOGIN] = ary[0];

        res.json({err: err, img: base64.fromByteArray(ary[1])});

        return;
      }

      send(res, err);

    } else {

      session[session_key.LOGIN_TIMES] = 0;
      session[session_key.IDENTIFY_LOGIN] = undefined;

      var u = _.clone(session.user);

      delete u.password;
      send(res, null, u)
    }

  })
})


//
//  uuid  from  store ;
router.get("/vuuid", function (req, res) {
  store.get(req.query.uuid, function (err, data) {
    send(res, null, data != undefined);
  });

})


//step 1;
// reset super user of  account ; send  email to reset ;
//0: verify identifycode
//1: get admin's email   by account name
//2:  send  eamil to reset  admin  ;
// query = account & idenfify ;
router.get("/admin", function (req, res, next) {

  var idenfigy_ = req.query.identify,
    session_idenfify_ = req.session[session_key.IDENTIFY_U_ADMIN],
    account = req.query.account;

  if (!session_idenfify_ || idenfigy_ != session_idenfify_) {
    // send(res , error_code.IDENTIFY_ERR)
    // return ;
  }

  async.waterfall([
    // get admin's email , add code ;
    function (callback) {
      rest.inner({
        method: "POST",
        uri: "/accounts/" + account + "/verify/pwdretrieval/create"
      }, req, callback)
    },

    function (admin, callback) {  // admin = { email , code }
      var uuid = admin.code,
        emailAddr = admin.email;

      email.sendMail(emailAddr,
        "Thinglinx 找回密码",
        "/#/access/forgotpwd?v=" + uuid ,
        "点此按钮重设管理员用户名及密码!",
        '请在30分钟内完成操作',
        "重设管理员用户密码",
        function (err, info) {
          if (err) {
            callback(error_code.SEND_MAILL_ERR)
          } else {
            store.put(uuid, account);
            callback(null)
          }
        }
      )
    }
  ], function (err, ret) {
    send(res, err, ret)
  })


})

// step 2  , reset password ;
// reset admin user of account ;  update admin user ;
//
// body  ={ code ,   password }
router.post("/admin", function (req, res) {

  var uuid = req.body.code;

  async.waterfall([
    function (callback) {
      store.get(uuid, function (err, obj) {
        callback(err ? error_code.PAGE_EXPIRE : null, obj)
      })
    },

    // update  admin user ;
    function (account_name, callback) {

      rest.inner({
        method: "PUT",
        uri: "/accounts/" + account_name + "/super_user/pwdretrieval",
        body: req.body
      }, req, callback)

    }

  ], function (err, ret) {
    if (!err) {
      store.remove(uuid);
    }

    send(res, err, true)

  })


})


// create  indentify ;  图片验证码;

router.get("/identify/:usedfor", function (req, res) {


  var ary = captcha.get(),
    txt = ary[0],
    buf = ary[1],
    usedFor_ = req.params.usedfor,
    session = req.session,
    condition = {
      "login": session_key.IDENTIFY_LOGIN,
      "account": session_key.IDENTIFY_C_ACCOUNT,
      "admin": session_key.IDENTIFY_U_ADMIN
    };
  session[condition[usedFor_]] = txt;
  res.send(buf);

})


// click url to  verify user's meial ;
//   以后要 移到 common 状态;
// query= { code  , v  }
router.get("/verifyemail", function (req, res) {
  var session = req.session,
    code = req.query.code;

  async.waterfall([
    // verify email ;
    function (cb) {
      rest.inner({
        method: "POST",
        uri: "/users/verify/email",
        qs: {code: code}
      }, req, cb)
    }
  ], function (err, ret) {
    //if( err ){
    //    send( res , err )
    //}else{
    //    if( session.user.id == store_user.id ){
    //      _.extend( session.user ,  {  emailverify}  )
    //    }
    //}

    send(res, err, ret);


  })


})


})()

