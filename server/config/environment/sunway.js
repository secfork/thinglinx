'use strict';

var path = require('path');
var _ = require('lodash');

 
// All configurations will extend these options
// ============================================
module.exports = { 
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',
 


  session_timeout: 5 ,
  website_location:"http://172.18.16.254:8090/webapp",
  rest_https:"https://192.168.122.105:443/v2/json",
  rest_http:"http://192.168.122.105:3000",
  oss_url:"oss-cn-beijing.aliyuncs.com",
  oss_bocketname:"thinglinx-test",




  // 单机
  redisOptions: {
    host:"127.0.0.1",
    port:6379

  }



};
 