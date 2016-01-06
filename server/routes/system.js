var router = require('express').Router(),
  _ = require("lodash"),
  async = require("async"),
  send = require("./utils/send"),
  rest = require("./utils/rest");



module.exports = router;



// create system ;
router.post("" , function( req , res ){

  rest.response({
      method:"POST",
      uri:"/systems"
    },
    req, res ) ;

})

// del system
// query = { system_id }
router.delete("" , function( req , res ){

  rest.response({
      method:"DELETE",
      uri:"/systems/"+ req.query.system_id
    },
    req, res ) ;

})


// get system    include  device , profile ,tag , trigger , message ;
// query = {  system_id ,   profile , tag , device }   ;
//                       ( profile , tag , device ) =  boolen ;

router.get("" , function (req ,res ) {

  var query = req.query ;

  rest.response({
     uri:"/systems/" +  query.system_id ,

     qs:{extend_device : !!query.device  ,
         extend_profile : !!query.profile  ,
         include_tags :  !! query.tag  }
  } , req, res)


})



router.get("/total" , function(req ,res){

    req.query.calc_sum = true ;

    rest.response({
       uri:"/query/systems"
    } , req , res );

})



// query system ;
// query = { isactive ,  uuid  , name region_id , model , desc , state: 1||[0,2]  }
router.get("/query" , function (req ,res) {
   var query_ = req.query ;
  query_.sorts = "name";

  if( query_.uuid  ){
     query_.uuid += /.\*$/.test( query_.uuid)?"":"*";
  };

  if( query_.name  ){
     query_.name += /.\*$/.test( query_.name)?"":"*";
  };

  if( query_.desc  ){
     query_.desc += /.\*$/.test( query_.desc)?"":"*";
  };

  rest.query( "/query/systems" ,
        query_
      , req, res );



})



// update  system ;
router.put("", function (req ,res) {
  rest.response({
      method:"PUT",
      uri:"/systems/"+ req.body.uuid
  } , req ,res)

})



//=========================== 状态 :  sync , status ===============================

// get  system  which needs to sync ;
// body = [ system_id ..... ]
router.post("/needsync" , function( req , res ){

  if(! req.body.length ){
      return ;
  }

  rest.inner({
      uri:"/info/needupdate/systems",
      qs: { id: req.body }
    }, req , function (err, ret ) {

        res.json( {err:err , ret: ret}  );

  } ) ;

})

// get status of systems
// body = [ system_id ..... ]
router.post("/status" , function( req , res ){

  if(! req.body.length ){
    return ;
  }

  rest.response({
      uri:"/query/systems/status",
      qs:{ id: req.body }
  } , req ,res )

})





// ======================= DTU  server ========================
// get DTU  server  of  system ;

router.get("/getassign/:system_id" , function( req , res ){

  rest.inner({
      uri:"/info/systems/"+ req.params.system_id +"/assign"
  } ,req  , function (err , ret ) {
      send(res , err , ret );
  })

})




// ================系统联系人== 暂不支持====================



//===========================  控制 ===========================

// call system ;
//  CALL_REALTIME , CALL_STANDBY , CALL_ALL ,  CALL_LOG ;
// query={ type}
router.post("/:system_id" , function (req ,res) {

  var  calltype_ = { 0: "CALL_REALTIME" , 1:"CALL_STANDBY" , 2:"CALL_ALL"}


  rest.response({
    method:"POST",
    uri:"/systems/"+ req.params.system_id +"/control/poll",
    body:{ type:  calltype_[ req.query.type ] }
  }, req, res)

})


//  to start , stop  system     ;
// query = { cmd: start || stop } ;
router.get("/:system_id/control" , function (req, res ) {

    rest.response({
      method:"POST",
      uri:"/systems/"+ req.params.system_id +"/control/" + req.query.cmd
    } , req ,res)

})

//  to sync  system    ;
router.get("/:system_id/sync" , function (req, res ) {

  rest.response({
    method:"POST",
    uri:"/systems/"+ req.params.system_id +"/sync"
  } , req ,res)

})



// active  system ;
router.get("/:system_id/active" , function (req ,res) {
  rest.response({
    method:"PUT",
    uri:"/systems/"+ req.params.system_id +"/activate"
  },req ,res)

});

// un active  system ;
router.get("/:system_id/deactive" , function (req ,res) {
  rest.response({
    method:"PUT",
    uri:"/systems/"+ req.params.system_id +"/deactivate"
  },req ,res)

});


// assign system ;
// query = { driver_id }
router.get("/:system_id/assign" , function( req , res ){


  rest.inner({
    method:"PUT",
    uri:"/info/systems/"+ req.params.system_id +"/assign",
    body:{ driver_id : req.query.driver_id }
  } , req  , function (err , ret ) {
      send(res , err , ret );
  });




})


// start  system ;



