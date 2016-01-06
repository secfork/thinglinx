var router = require('express').Router(),
  rest = require("./utils/rest");


module.exports = router;





//  query  role ;
// req.query.role_category = 1|0 ;  1 =  region role ;  0 = account role ;
router.get("" , function( req , res ){

  req.query.offset = 0 ;
  req.query.limit = 200 ;

  rest.response({
      uri:"/query/roles",
    },
    req , res ) ;

})


// create role ;
router.post("" , function( req , res ){

  rest.response({
      method:"POST",
      uri:"/roles"
    },
    req, res ) ;

})


// update  role ;
router.put("/:role_id", function (req , res) {
  rest.response({
    method:"PUT",
    uri:"/roles/" + req.params.role_id
  }, req ,res)

})

// delete  role by id ;
// req.query.roleid ;
router.delete("/:role_id" , function( req , res ){

  rest.response({
      method:"DELETE",
      uri:"/roles/"+ req.params.role_id
    },
    req, res ) ;

})
