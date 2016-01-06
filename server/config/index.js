

'use strict';


// import initApp from "./express";

var path = require('path');
var _ = require('lodash');
 





function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {

  // initApp ,

  env: process.env.NODE_ENV,
  
  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'thinglinx-secret'
  },

  // Root path of server
  root: path.normalize(__dirname + '/../..'),

  // oss  pass ;
  oss_username: "kp74z938xM97OCnV",
  oss_password: "WmMdAKOWdjm0dr5UHtssXFmNyjeqqC",


  // 邮件发送服务器配置; 
  emailSender: {
    host: "smtp.qiye.163.com",
    port: 25,
    secure: false,
    auth: {
        user: "thinglinx@sunwayland.com.cn",
        pass: "ASSERT:galaxyl9t"
    }
  },

  // 短信发送服务借口; 
  smsSender: {
      account: "cf_thinglinx",
      password: "377f7cd17910c0620dea5ae4d1cbce86"
  },


};



// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all, 
  // require('./environment/' + process.env.NODE_ENV + '.js') || {}
  require('./environment/' + "local" + '.js') || {}

  );