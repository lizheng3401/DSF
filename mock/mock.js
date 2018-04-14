const Mock = require('mockjs')
const Random = Mock.Random

const unhealthPeople = function (opt) {
  let date = new Date("2017/03/01")
  let time = []
  let data = []
  for(let i = 0; i < 40; i++){
    time.push(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate())
    date = new Date(date.valueOf() + 60*1000*60*24)
    data.push(Random.natural(1,5))
  }
  return {
    time,
    data
  }
}

const sleepPeople = function (){
  let data = []
  let time = []
  let date = new Date("2018/04/10 19:00")
    for(let i = 0; i < 160; i++){
      date = new Date(date.valueOf() + 60*1000*5)
      time.push(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
      data.push(Random.natural(1,20))
    }
  return {
      time,
      data
  }
}

const periodPeople = function (opt) {
  let shallow = []
  let deep = []
  let total = []
  let time = []
  let date = new Date("2017/03/01 19:00")
    for(let i = 0; i < 40; i++){  
      time.push(date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate())
      date = new Date(date.valueOf() + 60*1000*60*24)
      s  =Random.float(0,5,2,2)
      d = Random.float(0,5,2,2)
      shallow.push(s)
      deep.push(d)
      total.push(s+d)
    }
  return {
      time,
      peroid:{
        shallow,
        deep,
        total
      }
  }
}

const newUnhealthPeople = function () {
  let users = []
  for(let i = 0; i < Random.natural(2,5); i++){
    let heart = Random.natural(50, 80)
    let breath = Random.natural(13, 20)
    let reason = ""
    if(heart > 70){
      reason = "心率过高"
    }else if(heart < 60){
      reason = "心率过低"
    }else{
      continue
    }
    let temp = {
      ID: Random.id,
      name: Random.cname(),
      heart,
      breath,
      status: ['danger', 'warning'][Random.natural(0,1)],
      reason,
    }
    users.push(temp)
  }
  return users
}

const detailPeople = function (){
  let init = new Date("2018/4/10 22:00:00")
  let begin = new Date(init.valueOf() +  + 60*1000*60*1*Random.float(0, 1))
  let min = Random.natural(450,540)
  let end = new Date(begin.valueOf() + min*60*1000)
  let deep = 1.5+Random.float(0,1)*1.5
  let total = (min/60).toFixed(1)
  let heart = []
  let breath = []
  let date = begin
  let time = []
  let move = []

  deep = deep.toFixed(1)
  let userInfo = {
    age: Random.natural(0,100),
    sex: ['男', '女'][Random.natural(0,1)],
    bed: Random.natural(1,100),
    person: Random.cname(),
    phone: 18482065213,
    begin: begin.getHours()+":"+begin.getMinutes()+":"+begin.getSeconds(),
    end: end.getHours()+":"+end.getMinutes()+":"+end.getSeconds(),
    deep: deep,
    total: total,
    avgDeep: Random.natural(0,3),
    avgShallow: Random.natural(0,3),
    avgHeart: Random.natural(60,75),
    avgBreath: Random.natural(10,20),
  }

  for(let i = 0; i < min; i++){
    time.push(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
    let key = (i< 30 | i > min-30)? Random.natural(5,10):Random.natural(1,10)
    heart.push((i< 30 | i > min-30)?Random.natural(60,75):Random.natural(45,65))
    breath.push((i< 30 | i > min-30)?Random.natural(15,20):Random.natural(10,18))
    if(key === 7){
      move.push([
       date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
       (i< 30 | i > min-30)? Random.natural(5,10):Random.natural(1,3)
      ])
    }
    date = new Date(date.valueOf() + 60*1000)
  }

  let wake = Random.float(10,30).toFixed(1)
  let shallow = min-wake-deep*60
  let sI = (shallow*Random.float(0.3,0.6)).toFixed(1)
  let sII = shallow - sI

  let peroid = {
    wake,
    sI,
    sII,
    deep
  }
  let avg_Heart = (heart.map( (x, y) => x+y )/heart.length).toFixed(1)
  let avg_Breath = (breath.map( (x, y) => x+y )/breath.length).toFixed(1)
  let avg_move = (move.map((x,y) => x[1]+y[1])/move.length).toFixed(1)
  let data = {
    radar: {
      data: [
        avg_Heart,
        avg_Breath,
        avg_move,
        deep,
        begin,
        end,
      ],
      score: Random.natural(0,100)
    },
    heart: {
      time: time,
      data:heart
    },
    breath:{
      time:time,
      data:breath,
    },
    move,
  }

  return {
    userInfo,
    data,
  }
}


const peroid = function () {
  var data = [];
  var startTime = new Date();
  var categories = ['AB'];
  var types = [
    { name: '觉醒期', color: '#7b9ce1' },
    { name: '浅睡I期', color: '#bd6d6c' },
    { name: '浅睡II期', color: '#75d874' },
    { name: '深睡期', color: '#e0bc78' },
  ];
  var baseTime = startTime.getTime();
  for (var i = 0; i < 8; i++) {
    var typeItem = types[i % 4];
    var duration = Math.round(Math.random() * 1000*60*100);
    data.push({
      name: typeItem.name,
      value: [
        0,
        baseTime,
        baseTime += duration,
        duration
      ],
      itemStyle: {
        normal: {
          color: typeItem.color
        }
      }
    });
  }
  return {
    startTime,
    data
  }
}

var date = new Date()
let name1 = Random.cname();
let name2 = Random.cname();
let name3 = Random.cname();
let name4 = Random.cname();
let name = [name1,name2,name3,name4]
const liveNow = function () {
  let ret = [
    [{title: '心率——'+name1, time: [],data: []},{title: '呼吸率——'+name1,time:[],data: []}],
    [{title: '心率——'+name2, time: [],data: []},{title: '呼吸率——'+name2,time:[],data: []}],
    [{title: '心率——'+name3, time: [],data: []},{title: '呼吸率——'+name3,time:[],data: []}],
    [{title: '心率——'+name4, time: [],data: []},{title: '呼吸率——'+name4,time:[],data: []}],
  ]
  for(let i = 0; i < 5; i++){ 
    for(let j = 0; j < 4; j++){
      ret[j][0].data.push(Random.natural(55, 75))
      ret[j][0].time.push(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
      ret[j][1].data.push(Random.natural(10,20))
      ret[j][1].time.push(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
      
    }
    date = new Date(date.valueOf() + 1000)
  }
  return ret
}

let people = Random.natural(5,10)
const livenum = function (){
  people += Random.natural(5,10)
  return [
    people,
    1000-people,
    people/10
  ]
}

const totalUsers = function (opt) {
  let users = [];
  for (let i = 0; i < 100; i++) {
    let newObject = {
      'id': i + 1,
      'username': Random.cname(),
      'email': Random.email(),
      'device': Random.guid(),
      'sleep': Random.guid().split('-').join(''),
      'status': ['success', 'warning', 'danger'][Random.natural(0, 2)]
    };
    users.push(newObject);
  }
  return {
    results: users,
    total: 100
  }
}
const userData = function (opt) {
  key = opt.url.split('=')[1].split('&')[0]
  query = opt.url.split('=')[2]
  page = parseInt(opt.url.split('=')[1])
  let j = page * 10 - 9
  let users = [];
  let total = 100
  for (let i = 0; i < 10; i++) {
    let newObject = {
      'id': j,
      'username': Random.cname(),
      'email': Random.email(),
      'device': Random.guid(),
      'sleep': Random.guid().split('-').join(''),
      'status': ['success', 'warning', 'danger'][Random.natural(0, 2)]
    };
    j += 1
    if (key === "status") {
      if (!(newObject.status === query)) {
        continue
      }
    }
    users.push(newObject);
  }
  return {
    results: users,
    total: total
  }
};

const totalDevices = function (opt) {
  let devices = []
  for (let i = 0; i < 100; i++) {
    let newObject = {
      "id": Random.guid(),
      "createdTime": Random.datetime(),
      "username": Random.cname(),
      'status': ['success', 'warning', 'danger'][Random.natural(0, 2)]
    }
    devices.push(newObject)
  }
  return {
    results: devices,
    total: 100
  }
}

const deviceData = function (opt) {
  let devices = []
  for (let i = 0; i < 10; i++) {
    let newObject = {
      "id": Random.guid(),
      "createdTime": Random.datetime(),
      "username": Random.cname(),
      'status': ['success', 'warning', 'danger'][Random.natural(0, 2)]
    }
    devices.push(newObject)
  }
  return {
    results: devices,
    total: 100
  }
}
const token = function(opt){
  return ''
}
// scrollbar
Mock.mock('api/newUnhealthPeople', 'get', newUnhealthPeople)

// hostory
Mock.mock('api/history/unhealthPeople', 'get', unhealthPeople)
Mock.mock('api/history/sleepPeople', 'get', sleepPeople)
Mock.mock('api/history/periodPeople', 'get', periodPeople)

// personal

Mock.mock('api/detail/people', 'get', detailPeople)
Mock.mock(`api/yesterday/period`, 'get', peroid)

Mock.mock(`api/now/live`, 'get', liveNow)
Mock.mock(`api/now/livenum`, 'get', livenum)

Mock.mock('api/users/lists/', 'get', totalUsers)
Mock.mock(RegExp('api/users/list/*'), 'get', userData)
Mock.mock(RegExp('api/users/create/*'), 'post', 'success')
Mock.mock(RegExp('api/users/update/*'), 'post', 'success')
Mock.mock(RegExp('api/users/delete/*'), 'get', 'success')

Mock.mock('api/users/lists/', 'get', totalDevices)
Mock.mock(RegExp('api/devices/list/*'), 'get', deviceData)
Mock.mock(RegExp('api/devices/create/*'), 'post', 'success')
Mock.mock(RegExp('api/devices/update/*'), 'post', 'success')
Mock.mock(RegExp('api/devices/delete/*'), 'get', 'success')

Mock.mock('api/login', 'post', token)
