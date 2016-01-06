var router = require('express').Router()
  , _ = require("lodash")
  , async = require("async")
  , send = require("./utils/send")
  , rest = require("./utils/rest");


;
module.exports = router;


//============================ system model  ================================

// create systemModel ;


router.post("", function (req, res) {

  var toReturn_;
  async.waterfall([
    // create system Model ,
    function (callback) {
      rest.doRest({
        method: "POST",
        uri: "/sysmodels",
        qs: {name: req.body.name}
      }, req, callback)
    },

    // create  default profile of the systemModel ;
    function (ret, callback) {
      toReturn_ = ret;

      var profile = {name: "Default Profile", desc: 'Default Profile ', system_model: ret};

      rest.doRest({
        method: "POST",
        uri: "/profiles",
        body: profile,
        noMergerBody: true
      }, req, callback)
    }

  ], function (err, ret) {

    send(res, err, toReturn_)


  })


})

// delete  ssytemModel ;
router.delete("", function (req, res) {

  rest.response({
    method: "DELETE",
    uri: "/sysmodels/" + req.query.uuid
  }, req, res)

})


// query systemModel  =  get all systemModel ;
// max size  = 1000 ;
router.get("", function (req, res) {

  rest.response({
    uri: "/query/sysmodels",
    qs: {offset: 0, limit: 1000, sorts: "create_time-"}
  }, req, res)

})


// update  ssytemModel ;
router.put("", function (req, res) {

  rest.response({
    method: "PUT",
    uri: "/sysmodels/" + req.body.uuid
  }, req, res)
})


//============================ devices  ================================

// create  systemModel  device  ;
router.post("/devices", function (req, res) {

  rest.response({
    method: "POST",
    uri: "/sysmodels/" + req.body.system_model + "/devices"
  }, req, res)


})

// delete  device  form  systemModel ;
router.delete("/devices", function (req, res) {

  rest.response({
    method: "DELETE",
    uri: "/sysmodels/" + req.query.system_model + "/devices/" + req.query.id
  }, req, res)

})


// get all device of  systemModel ;
router.get("/devices", function (req, res) {

  console.log(1111111111111111);

  rest.response({
    uri: '/sysmodels/' + req.query.system_model + '/devices'
  }, req, res)


})

// update system device ;
router.put("/devices", function (req, res) {
  var device2update_ = req.body;
  rest.response({
    method: "PUT",
    uri: "/sysmodels/" + device2update_.system_model + "/devices/" + device2update_.id
  }, req, res)

})


//============================ tags ================================

// create tag to systemModel ;
router.post("/tags", function (req, res) {
  rest.response({
    method: "POST",
    uri: "/sysmodels/" + req.body.system_model + "/tags"
  }, req, res)

})


// delete tag from  systemModel ;
router.delete("/tags", function (req, res) {
  rest.response({
    method: "DELETE",
    uri: "/sysmodels/" + req.query.system_model + "/tags/" + req.query.id
  }, req, res)

})


// get all tags  from systemModel ;
router.get("/tags", function (req, res) {

  rest.response({
    uri: "/sysmodels/" + req.query.system_model + "/tags"
  }, req, res)

})


// update  tags of systemModel ;
router.put("/tags", function (req, res) {

  var tag2update_ = req.body;

  rest.response({
    method: "PUT",
    uri: "/sysmodels/" + tag2update_.system_model + "/tags/" + tag2update_.id
  }, req, res)
})


// ====================== message ==========================

// message   暂未实现;
// create message ;
router.post("/messages", function (req, res) {

})

// update message ;
router.put("/messages", function (req, res) {

})

// delete message
router.delete("/messages", function (req, res) {

})

// get message by id ; || get all message of system ;
router.get("/messages", function (req, res) {

})


//  get systemModel by PK ;
router.get("/:pk", function (req, res, next) {

  rest.response({
    uri: "/sysmodels/" + req.params.pk
  }, req, res)


})
