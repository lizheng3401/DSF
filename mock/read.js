// var fs=require('fs');
// var file="D:\\Daily\\DeepSleep\\DSF\\mock\\data.json";
// var result=JSON.parse(fs.readFileSync(file));
// console.log(JSON.stringify(result.userData, null, 2));
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://120.79.137.249:27017/";
let func = require("./mock").func;

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

function import_data (cols, data){
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let dbase = db.db("ms");
      dbase.collection(cols).insertMany(data, function(err, res) { // 返回集合中所有数据
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
      });
  });
}
delete data.userData['total']
delete data.deviceData['total']
console.log(JSON.stringify(data.deviceData, null, 2))

import_data('userData', data.userData.results);
import_data('deviceData', data.deviceData.results);


