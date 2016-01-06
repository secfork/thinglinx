var error_code = require("./error"),
  node_schedule = require('node-schedule') ;


var store = {};


//定义定时器   每天 凌晨 3 点执行;
var rule = new node_schedule.RecurrenceRule();
rule.dayOfWeek = [new node_schedule.Range(0, 6)];
rule.hour = 3;
rule.minute = 0;

node_schedule.scheduleJob(rule, function () {
  //执行定时计划
  console.log(" clean  uuid  store !! ");
  var uuid_,
    now_ = Date.now();
  for (uuid_ in store) {
    // 清理超时的 uuid ;
    if (store[uuid_].__$$timestamp__ < now_) {
      delete  store[uuid_];
    }
  }

});




module.exports = {

  /**
   * 必须为 obj 对象;
   * @param uuid
   * @param obj
   * @param time
   */
  put: function (uuid, obj, time) {

    if (!( obj instanceof Object )) {
      obj = {__$$obj__: obj}
    }

    time = time || 30;
    obj.__$$timestamp__ = Date.now() + time * 1000 * 60;  // 过期时间点;
    store[uuid] = obj;

  },

  get: function (uuid, cb) {
    var obj = store[uuid];

    if (!obj) {
      cb(error_code.STORE_NO_DATA);
      return;
    }

    if (obj.__$$timestamp__ < Date.now()) {
      delete  store[uuid];
      cb(error_code.STORE_TIME_OUT)  // 过期 即作废;
      return;
    }

    delete   obj.__$$timestamp__;

    cb(null, obj.__$$obj__ || obj);

  },

  remove: function (uuid) {
    delete  store[uuid]
  }


}
