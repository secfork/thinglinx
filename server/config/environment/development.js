'use strict';

// Development specific configuration
// ==================================
 

module.exports = {
 
	  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '127.0.0.1',

  // 单机
  redisOptions: {
  	 host:"127.0.0.1",
  	 port:6379
  },


  session_timeout:30,

  website_location:"http://console.thinglinx.net",
  
  rest_https:"https://100.98.139.138:443/v2/json",
  rest_http:"http://100.98.139.138:3000",
  oss_bocketname:"thinglinx-net",
  oss_url:"oss-cn-beijing-internal.aliyuncs.com",







};
