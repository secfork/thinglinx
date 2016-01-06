var router = require('express').Router(),
  _ = require("lodash"),
  async = require("async"),
  send = require("./utils/send"),
  rest = require("./utils/rest");

module.exports = router;



// create  subscribes ;
router.post("" , function (req ,res ) {

  rest.response({
    method:"POST",
    uri:"/notify/subscribes"
  }, req, res)

})







// query  subscribes ;

router.get("/select" , function (req ,res ) {

  rest.response({
    uri:"/notify/subscribes" ,
    qs: _.extend({ type: "alarm"} ,  req.query )
  }, req, res);

})



// del subscribes ;

router.delete("/:subscribe_id" , function (req ,res ) {

  rest.response({
    method:"DELETE",
    uri:"/notify/subscribes/" + req.params.subscribe_id
  }, req, res)

})

