var router = require('express').Router(),
    rest = require("./utils/rest");

module.exports = router;




// create region ;
router.post("" , function( req , res ){

    rest.response( {
      method:"POST",
      uri:"/regions"
    },  req, res )

})



// query regions ;
router.get("" , function( req , res ){

  req.query.sorts = "name";

  if( req.query.name   ){
      req.query.name  += /.\*$/.test( req.query.name)?"":"*";
  }
  rest.query(
    "/query/regions",
    req.query,
    req, res ) ;

})


//  区域权限 用户;
//  req.query = { region_id }
router.get("/authoruser" , function (req ,res) {

  req.query.limit = 2000;

  rest.response( {
    uri:"/permissions"
  } , req ,res )

});



// get the total num of all regions  ;
router.get("/total" , function (req ,res) {
  rest.response({
     uri:"/query/regions",
     qs:{ calc_sum: true}
  }, req ,res)

})

// get   status  of  region system  ;
// query.state ;   body:[ regioni_ds... ]
router.post("/sum" , function( req , res ){

  var qs_ = { region_id:  req.body,  state: req.query.state };

  rest.response({
      uri:"/query/systems/sum",
      qs: qs_
    },
    req, res ) ;

})


// delete region by  id ;
router.delete("/:region_id" , function( req , res ){

  rest.response({
      method:"DELETE",
      uri:"/regions/" + req.params.region_id
    },
    req, res ) ;

})




// get region by id ;
router.get("/:region_id" , function( req , res ){

  rest.response({
      uri:"/regions/" + req.params.region_id
    },
    req, res ) ;

})


// update region ;
router.put("/:region_id" , function( req , res ){

  rest.response({
      method:"PUT",
      uri:"/regions/" + req.params.region_id
    },
    req, res ) ;

})

//====================================================================


