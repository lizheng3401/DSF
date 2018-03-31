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
    radar: [
      Random.natural(0,100),
      Random.natural(0,20),
      Random.natural(0,100),
      Random.natural(0,5),
      Random.natural(0,3),
      Random.natural(0,2),
    ],
    heart,
  }

  return {
    userInfo,
    data,
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