<template>
  <div>
    <el-col class="carousel" :span="20">
      <el-row>
        <el-col :span="4"><el-tag size="small">已睡：{{users[0]}}</el-tag> <el-tag size="small">未睡：{{users[1]}}</el-tag></el-col>
        <el-col :span="16">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="users[2]"></el-progress>
        </el-col>
      </el-row>
      <el-row> 
        <el-carousel height="550px" :interval="5000" @change="show" :initial-index="0" :autoplay="false">
          <el-carousel-item v-for="item in 4" :key="item">
            <single-line :chartData="chartData[0]" height="300px" v-if="isShow == item"></single-line>
            <single-line :chartData="chartData[1]" height="300px" v-if="isShow == item"></single-line>
          </el-carousel-item>
        </el-carousel>
      </el-row>
    </el-col>
    <el-col :span="4">
     <scorll-bar></scorll-bar>
    </el-col>
  </div>
</template>

<script>
import {live} from "../../api/api"
import scorllBar from "../../components/parts/bar/scrollBar.vue";
import SingleLine from "../../components/parts/charts/SingleLine.vue";
export default {
  name: "live",
  components: {
    scorllBar,
    SingleLine
  },
  data() {
    return {
      users: [],
      chartData: [],
      isShow: 0,
    };
  },
  methods: {
    updateData(){
      const self = this;
      let time = []
      let heart = []
      let breath = []
      this.$http({
        url: '/api/RealTimeData?Phone=18081979297',
        method: 'get'
      }).then( resp => {
        const temp = {
          Timestamp: resp.data.Timestamp,
          BreathRate: resp.data.BreathRate.replace('[', '').replace(']', '').split(','),
          HeartRate: resp.data.HeartRate.replace('[', '').replace(']', '').split(','),
        }
        let date = new Date(temp.Timestamp*1000)
        for(let i = 0; i < 10; i++){
          time.push(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
          date = new Date(date.valueOf() + 1000)
          heart.push(parseInt(temp.HeartRate[i]))
          breath.push(parseInt(temp.BreathRate[i]))
        }
        // self.chartData = self.fetchData(time, heart, breath)
        self.chartData = [
          {
            title: '心率',
            time: [1,2,3,4,5,6,7,8,9,0],
            data: [1,2,3,4,5,6,7,8,9,0],
          },
          {
            title: '呼吸率',
            time: [1,2,3,4,5,6,7,8,9,0],
            data: [1,2,3,4,5,6,7,8,9,0],
          }
        ]
      }).catch( function (error) {
        console.log(error)
      })
    },
    fetchData(time, heart, breath){
      let H = {title: '心率'}
      let B = {title: '呼吸率'}
      
      if(this.chartData.length === 0){
        H.time = time;
        H.data = heart;
        B.time = time;
        B.data = breath;
        return [H, B]
      } else if(this.chartData.length > 0 & this.chartData[0].data.length < 50){
        H.time = this.chartData[0].time.concat(time);
        H.data = this.chartData[0].data.concat(heart);
        B.time = this.chartData[1].time.concat(time);
        B.data = this.chartData[1].data.concat(breath);
        return [H, B]
      } else {
        const temp = this.chartData
        try {
          for(let i = 0; i < 10; i++){
            temp[0].time.shift();
            temp[0].data.shift();
            temp[1].time.shift();
            temp[1].data.shift();
            temp[0].time.push(time[i]);
            temp[0].data.push(heart[i]);
            temp[1].time.push(time[i]);
            temp[1].data.push(breath[i]);
          }
        } catch (error) {
          console.log(error);
        }
        return temp
      }
    },
    show(prev,next){
      this.isShow = prev+1
    },
  },
  created() {
    const self = this
    this.updateData()
    /* setInterval(function () {
      self.updateData()
    }, 10000) */
    let people = Math.round(Math.random() * 1000)
    this.users.push(people)
    this.users.push(1000 - people)
    this.users.push(people/10)
  }
};
</script>

<style scoped>
canvas {
  width: 500px;
}
.el-progress {
  position: absolute;
  height: 10px;
  width: 83%;
}
</style>
