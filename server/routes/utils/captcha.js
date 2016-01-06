
var base64 = require('base64-js'),
    utils = require("./utils");

var ccap = require('ccap')( {

  width:100,//set width,default is 256
  //
  height:35,//set height,default is 60
  //
  offset:18,//set text spacing,default is 40
  //
  quality:20,//set pic quality,default is 50
  //
  fontsize: 25 ,

  generate:function(){
    return   utils.randomStr(4);
  }

});


module.exports =  ccap ;
