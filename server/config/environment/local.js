'use strict';

var path = require('path');
var _ = require('lodash');

 

// All configurations will extend these options
// ============================================
module.exports = { 
 
  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0', 

 
  //原来的有效时长上 减去 的分钟数 ;
  applykey_offset: 1 ,

  // session 生命时长;
  session_timeout: 1,

  website_location: "http://localhost:8090/app",
  // rest  地址; 
  rest_https: "https://172.18.16.254:443/v2/json",
  rest_http: "http://172.18.16.254:3000",

  // oss bocket name ;
  oss_bocketname: "thinglinx-test",
  oss_url: "oss-cn-beijing.aliyuncs.com",


  // redis 配置 单机
  redisOptions: {
  	 host:"127.0.0.1",
  	 port:6379
  }


};
 