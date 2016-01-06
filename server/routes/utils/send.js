module.exports = function( res , err , ret  ){
	var  t = {};

	if( err != undefined ){
		t.err = err ;
	}else {
    t.ret = ret ;
  }

	res.json( t );

}
