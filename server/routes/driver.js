var router = require('express').Router()

  , rest = require( "./utils/rest");

module.exports = router;



router.get("/device" , function (req ,res ) {

    rest.response( {
      uri:"/query/drivers",
      qs:{category:"DEVICE"}
    } , req, res );

})


router.get("/dtu" , function (req, res) {
  rest.response({
    uri:"/query/drivers",
    qs:{category:"CHANNEL"}
  } , req, res )

})
