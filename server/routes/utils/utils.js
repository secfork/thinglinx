var uuid = require("uuid"),
   
    num  = "0123456789",
    str = "234579werupasfghkzxcnm";   // 22个




exports.uuid = function () {
    return uuid.v4() ;
}

 

exports.randomNum = function( size ){
   size = size || 6 ;

  var no_ ="" ;

   for( var i = 0 ; i<size ; ++i ){
     no_ += num.charAt( Math.random()*10 )   ;
   }

  return  no_

}

exports.randomStr = function( size ){
  size = size || 4 ;

  var s_ ="" ;

  for( var i = 0 ; i<size ; ++i ){
    s_ += str.charAt( Math.random()*22  )   ;
  }
  return  s_
}


