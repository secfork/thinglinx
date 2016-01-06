var router = require('express').Router()
  , _ = require("lodash")
  ,async = require("async")
  ,send = require("./utils/send")
  , rest = require("./utils/rest")
  , error_code = require("./utils/error")
  ,utils = require("./utils/utils")
  , ossClient = require("./utils/oss")
  ;

module.exports = router ;

router.post("/system" , function (req , res) {



    var   file_ = req.files["sys_picture"],



          old_pic_url_ = req.body.old_pic_url_,
          system_id_ = req.body.system_id,
          file_name_ ;

    if( !system_id_ || !file_ ){
        send(res , error_code.FORM_ERR );
        return ;
    }


     file_name_ =   req.session.user.account_id +"/" + system_id_ +"_" + utils.randomStr(6) ;

    // file 名称不能为中文 , 否则 aliyun 会报错;
    file_.name = file_name_ ;

    async.waterfall([

      // upload picture file ;
      function ( callback ) {
          ossClient.putObject(file_ , function (err , info) {
              callback( err && error_code.OSS_UPLOAD_ERR , info )
          } )
      },

      // update  system  picture_url  filed ;
      function ( oss_result ,callback) {
          rest.doRest({
            method:"PUT",
            uri:"/systems/"+ system_id_,
            body:{ system_id : system_id_ , pic_url :  file_name_ }
          }, req , callback )
      } ,
      // del old picture  file ;

      function ( ret ,  callback ) {
          if( old_pic_url_ ){
            ossClient.delObject( old_pic_url_ , function (err , info ) {
              callback( err && error_code.OSS_DELETE_ERR , info );
            }) ;
          }else{
            callback( null );
          }
      }

    ] , function ( err, ret ) {
        send( res,  err && error_code.OSS_UPLOAD_ERR ,  file_name_ );
      return ;
    })




})



