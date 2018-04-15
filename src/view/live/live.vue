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
            <single-line :chartData="chartData.length != 0? chartData[item-1][0]:{}" height="280px" v-if="isShow == item"></single-line>
            <single-line :chartData="chartData.length != 0? chartData[item-1][1]:{}" height="280px" v-if="isShow == item"></single-line>
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
import {live, liveNum} from "../../api/api"
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
      const self = this
      live({}).then( resp => {
        self.chartData = self.fetchData(resp.data,self.chartData)
      }).catch( function (error) {
        self.$message({
          type: 'warning',
          duration: 1000,
          message: "更新数据失败\n"+error
        })
      })
    },
    fetchData(data,oldData){
      const self = this
      let newData = []
      let tempData = data
      if(oldData.length == 0){
        return data
      }else if(oldData[0][0].data.length < 50){
        for(let i = 0; i < 4; i++){
          let temp = []
          for(let j = 0; j < 2; j++){
            let time = oldData[i][j].time.concat(tempData[i][j].time)
            let data = oldData[i][j].data.concat(tempData[i][j].data)
            temp.push({
              title: oldData[i][j].title,
              time,
              data
            })
          }
          newData.push(temp)
        }
        return newData
      }else if(oldData[0][0].data.length >= 50){
        for(let i = 0; i < 4; i++){
          let temp = []
          for(let j = 0; j < 2; j++){
            let symbol = oldData[i][j]
            for(let k = 0; k < 5; k++){
              symbol.time.shift()
              symbol.time.push(data[i][j].time[k])
              symbol.data.shift()
              symbol.data.push(data[i][j].data[k])
            }
            temp.push(symbol)
          }
          newData.push(temp)
        }
        return newData
      }
    },
    show(prev,next){
      this.isShow = prev+1
    },
    getSleepNum(){
      const self = this
      liveNum().then(resp =>{
        self.users = resp.data
      }).catch( function (error) {
        self.$message({
          type: 'warning',
          duration: 1000,
          message: "更新睡眠人数错误"+error
        })
      })
    }
  },
  created() {
    const self = this
    this.updateData()
    setInterval(function () {
      self.updateData()
    }, 5000)
    setInterval(function () {
      self.getSleepNum()
    }, 5000)
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
