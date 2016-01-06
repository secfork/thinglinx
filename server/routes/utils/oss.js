
var config = require("../../config"), 
    fs = require("fs"),
    OSS = require('aliyun-oss') ;



var oss = OSS.createClient( {
  host:     config.oss_url ,
  accessKeyId: config.oss_username ,
  accessKeySecret: config.oss_password


})




/**
 * source:  上传的文件, 可以是文件路径、 buffer、 stream
 * headers: 可选，用户自定义 header，如: x-oss-meta-location
 *          当上传方式为: buffer 或者 stream,
 *          建议添加 'Content-Type'(此时无法根据扩展名判断)
 */
exports.putObject = function ( file , cb ) {

  console.log(  " upload  oss object =  " , file.name  );

  oss.putObject({
      bucket:  config.oss_bocketname,
      object:   file.name ,  // picture  name ;
      source:   fs.createReadStream( file.path )   ,  //  picture  path ;
      'acl-bucket':"public-read",

    }, cb );

}


exports.delObject = function ( string_object_name  , cb ) {
  console.log( "delete oss object = " , string_object_name );
  oss.deleteObject({
    bucket:  config.oss_bocketname ,
    object:  string_object_name
  }, cb );

}


