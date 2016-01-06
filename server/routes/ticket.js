var router = require('express').Router(),
  _ = require("lodash"),
  async = require("async"),
  send = require("./utils/send"),
  rest = require("./utils/rest");

module.exports = router;



// bind ticket
// body = { sn:xx , privilege:[... ]}
router.post("/:system_id" , function( req , res ){

  rest.response({
      method:"POST",
      uri:"/systems/"+ req.params.system_id +"/bind"
    },
    req, res ) ;

})


// un bind ticket
router.delete("/:system_id" , function( req , res ){

  rest.response({
      method:"POST",
      uri:"/systems/"+ req.params.system_id +"/unbind"
    },
    req, res ) ;

})



// get ticket by system_id ;
router.get("/:system_id" , function( req , res ){

  rest.response({
      uri:"/systems/"+ req.params.system_id +"/bind"
    },
    req, res ) ;

})



