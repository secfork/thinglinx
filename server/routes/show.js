var router = require('express').Router(),
  _ = require("lodash"),
  async = require("async"),
  send = require("./utils/send"),
  rest = require("./utils/rest");


module.exports = router;




//======================= alarm ====================

// confirm alarm ;
// params = { system_id , alarm_id , message }
router.post("/alarm/confirm" , function( req , res ){

  var qs_ = { id: req.query.alarm_id },
      body_ = { user_id:  req.session.user.id , message: req.query.message };

  rest.response({
      method:"PUT",
      uri:"/systems/"+ req.query.system_id +"/alarm/ack",
      qs: qs_ ,
      body: body_,

    },
    req, res ) ;

})



//  get  alarm confirm message ;
// query = { system_id , ack_id }
router.get("/alarm/confirm" , function( req , res ){

  rest.response({
      uri:"/systems/"+ req.query.system_id+"/alarm/ack",
      qs: { id: req.query.ack_id }
    },
    req, res ) ;

})



// req.
router.get("/alarm/total" , function(req ,res ){

  req.query.calc_sum = true ;

  rest.response({
    uri:"/query/alarms"
  } , req ,res );

});




// query alarm ;
router.get("/alarm/query" , function( req , res ){

  req.query.sorts = "id-";

  rest.query( "/query/alarms",
    req.query,
    req, res ) ;

})




// query active Alarm ;
router.get("/alarm/:system_id" , function( req , res ){

  var  qs_ = _.extend( { sorts : "id-" } , req.query  );

  rest.query(
    "/systems/"+ req.params.system_id +"/alarms" ,
    qs_,
    req, res ) ;

})


// 系统总报警数;
router.get("/alarm/:system_id/total" , function (req ,res ) {
  req.query.calc_sum = true ;

  rest.response({
      uri: "/systems/"+ req.params.system_id +"/alarms"
  } , req , res )
});


// 查询最后报警;
router.get("/alarm/:system_id/lastalarm" , function (req ,res ) {
  req.query.sorts = "id-";
    req.query.limit = 1 ;

  rest.response({
    uri: "/systems/"+ req.params.system_id +"/alarms"
  } , req , res )


})




// query all  Alarm ;

router.post("/alarm/:system_id" , function( req , res ){

  var  qs_ = _.extend( { sorts : "id-" } , req.query  );

  rest.query(
    "/systems/"+ req.params.system_id +"/alarmhistory" ,
    qs_, req, res ) ;

})




//========================= live data ==========================
// live tags data ;
// query : [ tag ..... ]
router.get("/live/:system_id" , function( req , res ){

  rest.response({
      uri:"/systems/"+ req.params.system_id +"/live"
    },
    req, res ) ;

})



//=========================== tag history =============================

// get tags  history data ;
// query = { tag:[] , start , end , num , type }
// type ==> 'Analog"' || "degital" ;
router.get("/history/:system_id", function (req, res) {

  var  query_  = req.query ;


  if( !query_.tag ){
      return ;
  }

  query_.count = ( query_.num &&  query_.num >400 )?400: query_.num ;



  async.waterfall([
      // read  at time data ;
    function (callback) {
        rest.doRest({
          uri:"/systems/"+ req.params.system_id +"/log/readattime",
          qs:{t: query_.start , mode: "Analog"==query_.type ?"linear":"last_value",  tag: query_.tag }
        }, req , callback)

    },

    // read history  data ;
    function (  attimedata  , callback) {
        var uri = "/systems/"+ req.params.system_id +"/log/" + ( (query_.end - query_.start) > 1000*60*60*6?"readinterval":"readraw" );

        rest.doRest({
          uri:uri,
          qs : query_
        }, req, function (err ,  hisdata ) {

            callback( err ,  attimedata ,  hisdata )
        })
    }

  ] , function (err , attimedata , hisdata) {
        if( err ){
            send(res, err)
            return ;
        }

        res.json([ {ret: attimedata} , { ret: hisdata }]);

  })

})





//===========================  write date  =============================

router.post("/livewrite/:system_id" , function (req ,res ) {
   rest.response({
     method:"POST",
     uri:"/systems/"+ req.params.system_id +"/control/write"
   }, req, res)

})



