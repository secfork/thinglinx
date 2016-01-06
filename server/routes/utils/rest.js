var config = require("../../config") 

  , async = require("async")
  , _ = require("lodash")
  , request = require("request")
  ;


var dealOptions = function (options, req) {
    var user = req.session.user;
    deal(options, user);
    if (!options.body) {
      options.body = req.body || {};
    }
    if (!options.qs) {
      options.qs = req.query || {};
    }
    options.qs.accesskey = user.accesskey;
    options.qs.limit = options.qs.limit || 1000 ;

  },

  deal = function (options) {
    options.useQuerystring = true;
    options.json = true;
    options.rejectUnauthorized = false;
    options.uri = config.rest_https + options.uri;
  },


  verifyAccessKey = function (req, cb) {
    var user = req.session.user,
      dateNow = Date.now();
    if (user.accesskey_expires < dateNow || !user.accesskey) {
      request({
        method: "POST",
        json: true,
        rejectUnauthorized: false,
        uri: config.rest_https + "/auth/user",
        body: {
          account: user.account,
          username: user.username,
          password: user.password
        }
      }, function (err, httpResponse, body) {

        if (err) {
          cb("rest_err");
          return;
        }
        if (body.err) {
          cb(body.err);
          return;
        } else {
          user.accesskey = body.ret.accesskey;
          user.accesskey_expires = body.ret.expires - 60000 * config.applykey_offset;
          cb(null);
        }
      })
    } else {
      cb(null)
    }
    ;
  };


module.exports.apllyAccessKey = function (user, cb) {

  var restOptions = {
    uri: "/auth/user",
    method: "POST",
    body: user
  };
  deal(restOptions);
  request(restOptions, cb);
}


/**
 *    options.noMergerBody
 options.noMergerQuery

 * @param restOptions
 * @param req
 * @param cb
 */
module.exports.doRest = function (restOptions, req, cb) {

  async.waterfall([
    function (callback) {
      verifyAccessKey(req, callback)
    },
    function (callback) {
      dealOptions(restOptions, req);
      request(restOptions, callback)
    }

  ], function (err, httpResponse, results) {

    if (err) {
      var user = req.session.user;
      console.error("rest Error", req._remoteAddress, user.account_id + "", user.username, restOptions.uri, err);
      cb("rest_err");
      return;
    }

    if (typeof results == "string") {
      cb("rest_404");
      return;
    }
    cb(results.err, results.ret);
  });
}


module.exports.response = function (restOptions, req, res) {
  async.waterfall([
      function (callback) {
        verifyAccessKey(req, callback)
      },
      function (callback) {
        dealOptions(restOptions, req);
        request(restOptions, function (err, httpResponse, results) {
          callback(err, results)
        })
      }
    ],
    // finally
    function (err, results) {
      if (err) {
        var user = req.session.user;
        console.error("rest Error", req._remoteAddress, user.account_id + "", user.username, restOptions.uri, err);
        res.json({err: "rest_err"})
        return;
      }
      res.json(typeof results == "string" ? ({err: "rest_404"}) : results);
    }
  )


};

/*
 ffaefaef
 */
/**
 * query   = 完全条件;
 * @param url
 * @param qs_data
 * @param req
 * @param res
 */
module.exports.query = function (url, qs_data, req, res) {
  var user = req.session.user,
    currentPage = qs_data.currentPage || 1,
    itemsPerPage = qs_data.itemsPerPage || 200;

  delete qs_data.currentPage;
  delete qs_data.itemsPerPage;


  var page = {};

  async.waterfall([
    function (callback) {
      verifyAccessKey(req, callback);
    },

    function (callback) {
      var restOptions_total = {
        uri: url,
        qs: _.extend({accesskey: user.accesskey}, qs_data, {calc_sum: true})
      };
      deal(restOptions_total, user);
      request(restOptions_total, function (err, httpResponse, results) {
        if (err) {
          callback({err: "rest_err"});
          return;
        } else if (results.ret instanceof String) {
          callback("rest_404")
        } else {
          page.total = results.ret;
          callback(null);
        }

      });
    },


    function (callback) {
      var restOptions_data = {
        uri: url,
        qs: _.extend({accesskey: user.accesskey}, qs_data, {
          // sorts:"create_time-",   // query 自己指定 sorts ;
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage
        })
      };
      deal(restOptions_data, user);
      request(restOptions_data, function (err, httpResponse, results) {
        if (err) {
          callback({err: "rest_err"});
        }
        ;
        if (results.err) {
          callback(results.err);
        } else if (results.ret instanceof String) {
          callback("rest_404")
        } else {
          page.data = results.ret;
          callback(null)
        }
      })
    }
  ], function (err, httpresponse, results) {
    if (err) {
      console.error("rest Error", req._remoteAddress, user.account_id + "", user.username, url, err);
      res.json({err: err});
    } else {
      res.json(page);
    }
  });
}

module.exports.inner = function (restOptions, req, cb) {

  var user = req.session.user || {};

  restOptions.uri = config.rest_http + restOptions.uri;
  restOptions.json = true;


  request(restOptions, function (err, httpresponse, result) {
    if (err) {
      var user = req.session.user;
      console.error("rest Error", req._remoteAddress, user.account_id + "", user.username, restOptions.uri, err);

      cb("rest_err")
    } else if (result.ret instanceof String) {
      cb(" rest_404")
    }
    else {
      cb(result.err, result.ret)
    }

  });

}





