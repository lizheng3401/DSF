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
        <el-carousel height="550px" :interval="5000" @change="show" :initial-index="0">
          <el-carousel-item v-for="item in 4" :key="item">
            <single-line :chartData="item === 1? chartData[0]: {}" height="300px" v-if="isShow == item"></single-line>
            <single-line :chartData="item === 1? chartData[1]: {}" height="300px" v-if="isShow == item"></single-line>
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
      chartData: undefined,
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
      })
      let H = {title: '心率'}
      let B = {title: '呼吸率'}
      if(true){
        H.time = time;
        H.data = heart;
        B.time = time;
        B.data = breath;
        this.chartData = [H, B]
        return 
      }
      if(this.chartData[0].time.length < 50){
        H.time = this.chartData[0].time.concat(time);
        H.data = this.chartData[0].data.concat(heart);
        B.time = this.chartData[1].time.concat(time);
        B.data = this.chartData[1].data.concat(breath);
        console.log(JSON.stringify(H, null, 2))
        this.chartData = [H, B]
        return 
      }
      
    },
    show(prev,next){
      this.isShow = prev+1
    },
  },
  created() {
    const self = this
    this.updateData()
    this.updateData()
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
