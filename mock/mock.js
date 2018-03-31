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
Mock.mock('api/history/unhealthPeople', 'get', unhealthPeople);
Mock.mock('api/history/sleepPeople', 'get', sleepPeople)
Mock.mock('api/history/periodPeople', 'get', periodPeople);