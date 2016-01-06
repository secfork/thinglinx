var router = require('express').Router(),
  _ = require("lodash"),
  async = require("async"),
  send = require("./utils/send"),
  rest = require("./utils/rest");


module.exports = router;

//  /line/xxxx
router.get('/:system_id', function (req, res) {

  var query_ = req.query;

  if (!query_.tag) {
    return;
  }

  if (query_.end - query_.start < 2 * 24 * 3600 * 1000) {//一天的使用read Raw
    rest.response({
        uri: "/systems/" + req.params.system_id + "/log/readraw",
        qs: {start: query_.start, end: query_.end, limit: query_.count, tag: query_.tag}
      },
      req, res);
  } else {
    rest.response({
        uri: "/systems/" + req.params.system_id + "/log/readinterval",
        qs: {start: query_.start, end: query_.end, count: query_.count, tag: query_.tag, mode: query_.mode}
      },
      req, res);
  }
})
