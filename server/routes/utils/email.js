
var nodemailer = require('nodemailer')
  , config = require("../../config") 
  , error_code = require("./error") ;


var transporter = nodemailer.createTransport( config.emailSender );


/**
 *   例子:
 *    sendMail( emailAddr ,
               "Thinglinx 找回密码" ,
               "/#/access/forgotpwd?v="+ uuid ,
               "点此按钮重设管理员用户名及密码!",
               "请在30分钟内完成",
               "重设管理员用户名及密码",
               function (err , info ) {
                    if( err ){
                      callback( error_code.SEND_MAILL_ERR)

                    }else{
                      store.put( uuid ,  account  ) ;
                      callback(null)
                    }
                }
            )
 *
 * cb = function( err , info )
*/
exports.sendMail = function ( to, subject , url , title1, title2 ,  buttontext ,  cb ) {

  url = config.website_location + url ;

  var html = [] ;
  html.push( "<!DOCTYPE html><html><head> <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'></head>")
  html.push("<body> <div class='email' style='width:700px;padding-bottom: 50px;'> <div class='hd' style='height:40px;padding-left: 30px;'><h2> <mg src='http://thinglinx-net.oss-cn-beijing.aliyuncs.com/thinglinx/logo_2.png'  style='width:150px; height:30px; '></h2> ")
  html.push("</div><div class='bd' style='padding:10px 55px 0 100px;'><div style='margin-top: 25px;font:bold 16px/40px arial;'>")

  html.push(  title1 )

  html.push(" <span style='color: #cccccc'>(")

  html.push( title2 )

  html.push(")：</span></div><div style='font:bold 18px/36px arial;  height:36px;text-align: center; '><a style='padding:5px 15px ; background-color:#8BB9CE ' href='")
  html.push( url )

  html.push("'>")

  html.push( buttontext )

  html.push("</a> </div> <div style='color: #ccc;margin-top: 40px;font:bold 16px/26px arial;'> 如果亲看不到上方的按钮<br> 可点击下面的链接以完成注册或复制下面的链接到浏览器地址栏中完成操作：<br><a style='color:#3399ff;font-weight: normal;  ' href='")
  html.push(url )

  html.push( "'>")

  html.push(url)

  html.push("</a></div></div></div></body></html>");

  if(!to){
      cb( error_code.NO_EMAIL_TO );
      return ;
  }

  transporter.sendMail( {
    from: 'thinglinx@sunwayland.com.cn', // sender address
    to: to , // list of receivers
    subject: subject, // Subject line
    html:  html.join("") // html body

  } , cb );



} ;

exports.sendSimpileEmail = function (  cb) {

}




function   simpileHtml (){
  var  html = [] ;

  html.push( "<!DOCTYPE html><html><head> <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'></head>")
  html.push("<body> <div class='email' style='width:700px;padding-bottom: 50px;'> <div class='hd' style='height:40px;padding-left: 30px;'><h2> <mg src='http://thinglinx-net.oss-cn-beijing.aliyuncs.com/thinglinx/logo_2.png'  style='width:150px; height:30px; '></h2> ")
  html.push("</div><div class='bd' style='padding:10px 55px 0 100px;'><div style='margin-top: 25px;font:bold 16px/40px arial;'>")

  html.push( title)

  html.push(" <span style='color: #cccccc'>(")

  html.push(note )

  html.push(" )：</span></div><div style='font:bold 18px/36px arial; width: 170px;   height:36px;background-color:#ff3300;text-align: center;margin:25px 0 0 140px; '><span style='color: #fff;  text-decoration: none;'>")
  //  .append( url )
  html.push( message )
  html.push("</span> </div> </div></div></body></html>");

}



var mailOptions = {
  from: 'thinglinx@sunwayland.com.cn', // sender address
  to: 'grrey@163.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world ✔', // plaintext body
  html: '<b>Hello world ✔</b>' // html body
};
