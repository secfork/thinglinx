var router = require('express').Router()
  , _ = require("lodash")
  , rest = require("./utils/rest");


module.exports = router;


// create profile
router.post("", function (req, res) {

  rest.response({
    method: "POST",
    uri: "/profiles"
  }, req, res);


})


// delete profile ;
router.delete("", function (req, res) {
  rest.response({
    method: "DELETE",
    uri: "/profiles/" + req.query.uuid
  }, req, res)

})

// get all profile of   system ;
router.get("", function (req, res) {
  rest.response({
    uri: "/profiles",
    qs: {system_model: req.query.system_model}
  }, req, res)


})

//update profile ;
router.put("", function (req, res) {
  rest.response({
    method: "PUT",
    uri: "/profiles/" + req.body.uuid
  }, req, res)

})


// add log tags  to  profile ;
router.post("/tags", function (req, res) {
  var logTag_ = req.body;
  rest.response({
    method: "PUT",
    uri: "/profiles/" + logTag_.profile + "/tags/" + logTag_.id
  }, req, res)

})

// delete log tags from profile ;
router.delete("/tags", function (req, res) {
  var logTags2del_ = req.query;
  rest.response({
    method: "DELETE",
    uri: "/profiles/" + logTags2del_.profile + "/tags/" + logTags2del_.id
  }, req, res)

})


// get All log tags  of profile ;
router.get("/tags", function (req, res) {

  rest.response({
    uri: "/profiles/" + req.query.profile + "/tags"
  }, req, res)

})

// update log tags ;
router.put("/tags", function (req, res) {
  var tags2update_ = req.body;
  rest.response({
    method: "PUT",
    uri: "/profiles/" + tags2update_.profile + "/tags/" + tags2update_.id
  }, req, res)


})


// query  all triggers  of  profile
router.get("/triggers", function (req, res) {
  var qs = req.query;
  qs.sort = ["id-"];

  rest.query("/profiles/" + qs.profile + "/triggers",
    qs, req, res)

})

router.delete("/triggers", function (req, res) {
  var trigger2del_ = req.query;
  rest.response({
    method: "DELETE",
    uri: "/profiles/" + trigger2del_.profile + "/triggers/" + trigger2del_.id
  }, req, res)
})

// update trigger ;
router.put("/triggers", function (req, res) {
  var trigger2update_ = req.body;
  rest.response({
    method: "PUT",
    uri: "/profiles/" + trigger2update_.profile + "/triggers/" + trigger2update_.id
  }, req, res)
})

//  create trigger  to  profile ;
router.post("/triggers", function (req, res) {

  rest.response({
    method: "POST",
    uri: "/profiles/" + req.body.profile + "/triggers"
  }, req, res)

})

