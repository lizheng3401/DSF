let func = require("./mock").func;
var fs = require("fs");

let data = {
  newUnhealthPeople: func.newUnhealthPeople(),
  unhealthPeople:func.unhealthPeople(),
  sleepPeople: func.sleepPeople(),
  periodPeople: func.periodPeople(),
  detailPeople: func.detailPeople(),
  liveNow: func.liveNow(),
  livenum: func.livenum(),
  totalUsers: func.totalUsers(),
  userData: func.userData({url: 'api/users/list/*?page=1'}),
  totalDevices: func.totalDevices(),
  deviceData: func.deviceData(),
  token: func.token()
}

let filename = "D:\\Daily\\DeepSleep\\DSF\\mock\\data.json";

fs.writeFileSync(filename, JSON.stringify(data));

var file="D:\\Daily\\DeepSleep\\DSF\\mock\\data.json";
var re=JSON.parse(fs.readFileSync(file));
module.exports = re
