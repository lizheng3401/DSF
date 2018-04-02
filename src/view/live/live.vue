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
        <el-col :span="12">
          <single-line :chartData="chartData" height="300px"></single-line>
        </el-col>
        <el-col :span="12">
          <single-line :chartData="chartData" height="300px"></single-line>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <single-line :chartData="chartData" height="300px"></single-line>
        </el-col>
        <el-col :span="12">
          <single-line :chartData="chartData" height="300px"></single-line>
        </el-col>
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
      chartData: {},
      temp: {},
      isShow: 0
    };
  },
  methods: {
    fetchData() {
      const self = this
      live({}).then( resp => {
        self.chartData = resp.data
        self.temp = resp.data
      }).catch( function (error) {
        self.$message({
          type: 'danger',
          message: error,
        })
      })
    },
    show(prev,next){
      this.isShow = prev+1
    }
  },
  created() {
    const self = this
    let people = Math.round(Math.random() * 1000)
    this.users.push(people)
    this.users.push(1000 - people)
    this.users.push(people/10)
    this.fetchData()
    setInterval( function () {
      let ti = new Date(new Date("2018/4/10 "+self.chartData.time[self.chartData.time.length - 1]).valueOf()+1000)
      self.temp.time.shift()
      self.temp.time.push(ti.getHours() + ":" + ti.getMinutes() + ":" + ti.getSeconds())
      self.temp.data.shift()
      self.temp.data.push(Math.round(Math.random() * 100))
      self.chartData = self.temp
    }, 1000)
    setTimeout(function(){
      self.isShow = 1
    }, 100)
    
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
