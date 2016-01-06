var router = require('express').Router()
  , _ = require("lodash")
  , rest = require("./utils/rest");


module.exports = router;


// crate device model ;
router.post("" , function (req ,res) {

  rest.response({
    method:"POST",
    uri:"/devmodels",
    body: _.extend( {account_id: req.session.user.account_id } , req.body  )
  } , req ,res )
})

// delete  deive model ;
router.delete("" , function (req ,res) {
  rest.response({
    method:"DELETE",
    uri:"/devmodels/"+ req.query.uuid
  } , req ,res ) ;

})

//  get all device model ;
//   max size 1000 ;
router.get( "" , function (req , res ) {
    rest.response({
      uri:"/query/devmodels",
      qs:{ offset:0 , limit: 1000 , sorts:"create_time-" }
    } , req ,res  )

})



// update  device model ;
router.put("" , function (req ,res) {
   rest.response({
      method:"PUT",
      uri:"/devmodels/"+ req.body.uuid
   }, req, res )
})


// update  points ;
router.put("/points", function (req ,res) {
  var body = req.body ;
  rest.response({
    method:"PUT",
    uri:"/devmodels/"+body.device_model +"/points/" + body.id
  } , req ,res )

})


// create point
router.post("/points" , function (req ,res) {

  rest.response({
    method:"POST",
    uri:"/devmodels/"+ req.body.device_model +"/points"
  } , req , res )

})

// delete point
router.delete( "/points" , function (req ,res ) {
    var point = req.query ;
    rest.response({
        method:"DELETE",
        uri:"/devmodels/"+ point.device_model +"/points/" + point.id
    } ,req ,res)

})

// get all points
router.get("/points" , function (req ,res ) {

  rest.response({
      uri:"/devmodels/"+ req.query.device_model +"/points"
  }, req ,res )

});




// get device model by id
//  不要匹配不上  同等级 的 GET:/points ;
router.get("/:device_model_id" , function (req ,res ) {

  rest.response({
    uri:"/devmodels/"+ req.params.device_model_id
  } , req ,res )

});




