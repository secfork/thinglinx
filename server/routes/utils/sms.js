var request = require("request")
  , _ = require("lodash")

  , parseString = require('xml2js').parseString
  , errorcode = require("./error")
  , config = require("../../config")
  , utils = require("./utils");

//, Url = "http://121.199.16.178/webservice/sms.php?method=Submit"


module.exports = function (phoneNo, cb) {
  if (!phoneNo) {
    cb(errorcode.NO_PHONENO);
    return;
  }

  var number = utils.randomNum(6);


  var requestOptions = {
    url: "http://121.199.16.178/webservice/sms.php",
    qs: {method: "Submit"},

    form: {
      account: config.smsSender.account,//"cf_thinglinx",
      password: config.smsSender.password,// "377f7cd17910c0620dea5ae4d1cbce86",

      mobile: phoneNo,
      content: "您的验证码是：" + number + "。请不要把验证码泄露给其他人并在15分钟内完成验证。如非本人操作，可不用理会！"
    }
  };

  request.post(requestOptions, function (err, httpresponse, result) {

    parseString(result, function (err, result) {
      var submitResult = result.SubmitResult;

      if (submitResult.code[0] == 2) {
        cb(null, number)
      } else {
        cb(submitResult.msg[0]);
      }

    })


  })


}


