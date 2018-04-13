const Mock = require('mockjs')
const Random = Mock.Random

const detailPeople = function (){
  let init = new Date("2018/4/10 22:00:00")
  let begin = new Date(init.valueOf() +  + 60*1000*60*1*Random.float(0, 1))
  let min = Random.natural(450,540)
  let end = new Date(begin.valueOf() + min*60*1000)
  let userInfo = {
    age: Random.natural(0,100),
    sex: ['男', '女'][Random.natural(0,1)],
    bed: Random.natural(1,100),
    person: Random.cname(),
    phone: 18482065213,
    begin: begin.getHours()+":"+begin.getMinutes()+":"+begin.getSeconds(),
    end: end.getHours()+":"+end.getMinutes()+":"+end.getSeconds(),
    deep: Random.natural(0,3),
    total: Math.round(min/60),
    avgDeep: Random.natural(0,3),
    avgShallow: Random.natural(0,3),
    avgHeart: Random.natural(60,75),
    avgBreath: Random.natural(10,20),
  }
  let heart = []
  let breath = []
  let date = begin
  let time = []
  for(let i = 0; i < min; i++){

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

data = Mock.mock(detailPeople)
console.log(JSON.stringify(data.userInfo, null, 2))