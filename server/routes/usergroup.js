var router = require('express').Router() ,


    rest = require("./utils/rest");

module.exports = router;

// xxxxxxxxxxxxxxx  组 带 更改;



// create userGroup ;
router.post("" , function (req ,res) {

  rest.response({
      method:"POST",
      uri:"/groups"
    } , req , res )

})



//  add user to user


// query usergorups
router.get("/query" , function (req, res) {

  rest.query("/query/groups" , req.body , req ,res);

})




