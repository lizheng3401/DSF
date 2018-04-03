const Mock = require('mockjs')
const Random = Mock.Random

const unhealthPeople = function (opt) {
  let date = new Date()
  let time = []
  let data = []
  for(let i = 0; i < 1000; i++){
    date = new Date(date.valueOf() + 60*1000*60)
    time.push(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes())
    data.push(Random.natural(1,1000))
  }
  return {
    time,
    data
  }
}

const sleepPeople = function (){
  let data = []
  let time = []
  let date = new Date("2018/3/23 19:00")
    for(let i = 0; i < 100; i++){
      date = new Date(date.valueOf() + 60*1000)
      time.push(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
      data.push(Random.natural(1,1000))
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
  let date = new Date("2018/3/23 19:00")
    for(let i = 0; i < 100; i++){
      date = new Date(date.valueOf() + 60*1000)
      time.push(date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate())
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
  for(let i = 0; i < Random.natural(2,10); i++){
    users.push({
      ID: Random.id,
      name: Random.cname(),
      heart: Random.natural(60, 100),
      breath: Random.natural(13, 30),
      status: ['danger', 'warning'][Random.natural(0,1)],
      reason: Random.csentence()
    })
  }
  return users
}

const detailPeople = function (){
  let userInfo = {
    age: Random.natural(0,100),
    sex: ['男', '女'][Random.natural(0,1)],
    bed: Random.natural(1,100),
    person: Random.cname(),
    phone: 18482065213,
    begin: Random.time(),
    end: Random.time(),
    deep: Random.natural(0,3),
    total: Random.natural(3,8),
    avgDeep: Random.natural(0,3),
    avgShallow: Random.natural(0,3),
    avgHeart: Random.natural(50,100),
    avgBreath: Random.natural(10,30),
  }
  let heart = []
  let breath = []
  let date = new Date()
  let time = []
  for(let i = 0; i < 480; i++){

    time.push(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
    date = new Date(date.valueOf() + 60*1000)
    heart.push(Random.natural(0,100))
    breath.push(Random.natural(0,20))
  }
  let data = {
    radar: {
      data: [
        Random.natural(0, 100),
        Random.natural(0, 20),
        Random.natural(0, 100),
        Random.natural(0, 5),
        Random.natural(0, 3),
        Random.natural(0, 2),
      ],
      score: Random.natural(0,100)
    },
    heart,
  }

  return {
    userInfo,
    data,
  }
}

const live = function () {
  let date = new Date()
  let heart = Random.natural(30, 100)
  let breath = Random.natural(10, 30)
  let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  return {
    time,
    heart,
    breath
  }
}

const heartBreath = function () {
  let date = new Date(new Date() - 1)
  let time = []
  let heart = []
  let breath = []
  for(let i = 0; i < 480; i++){
    time.push(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
    date = new Date(date.valueOf() + 60*1000)
    heart.push(Random.natural(30, 100))
    breath.push(Random.natural(10, 30))
  }
  return {
    heart: {
      title: '心率',
      time,
      data: heart,
    },
    breath: {
      title: '呼吸率',
      time,
      data: breath
    }
  }
}

const move = function () {
  let date = new Date(new Date() - 1)
  let data = []
  for(let i = 0; i < 48; i++){
    if(Random.boolean())
    {
      data.push([
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
        Random.natural(1, 10)
      ])
    }
    date = new Date(date.valueOf() + 60*1000*10)
  }
  return {
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
const liveNow = function () {
  let data = []
  let time = []
  let heart = []
  let breath = []
  for(let i = 0; i < 100; i++){
    date = new Date(date.valueOf() + 1000)
    time.push(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
    heart.push(Random.natural(30, 100))
    breath.push(Random.natural(10,30))
  }
  return [{
    title: '心率',
    time,
    data: heart
  },{
    title: '呼吸率',
    time,
    data: breath
  }]
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

// scrollbar
Mock.mock('api/newUnhealthPeople', 'get', newUnhealthPeople)

// hostory
Mock.mock('api/history/unhealthPeople', 'get', unhealthPeople)
Mock.mock('api/history/sleepPeople', 'get', sleepPeople)
Mock.mock('api/history/periodPeople', 'get', periodPeople)

// personal

Mock.mock('api/detail/people', 'get', detailPeople)
Mock.mock(`api/live/heartBreath`, 'get', live)
Mock.mock(`api/yesterday/heartBreath`, 'get', heartBreath)
Mock.mock(`api/yesterday/move`, 'get', move)
Mock.mock(`api/yesterday/period`, 'get', peroid)

Mock.mock(`api/now/live`, 'get', liveNow)


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
