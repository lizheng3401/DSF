<template>
  <div>
    <el-col class="carousel" :span="20">
      <el-row>
        <el-col :span="4">
          <el-tag size="small">已睡：{{users[0]}}</el-tag>
          <el-tag size="small">未睡：{{users[1]}}</el-tag>
        </el-col>
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
import { live, liveNum } from "../../api/api";
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
      chartData: [
        [{ title: "", time: [], data: [] }, { title: "", time: [], data: [] }],
        [{ title: "", time: [], data: [] }, { title: "", time: [], data: [] }],
        [{ title: "", time: [], data: [] }, { title: "", time: [], data: [] }],
        [{ title: "", time: [], data: [] }, { title: "", time: [], data: [] }]
      ],
      temp: [],
      isShow: 0
    };
  },
  methods: {
    show(prev, next) {
      this.isShow = prev + 1;
    },
    getSleepNum() {
      const self = this;
      liveNum()
        .then(resp => {
          self.users = resp.data.data;
        })
        .catch(function(error) {
          self.$message({
            type: "warning",
            duration: 1000,
            message: "更新睡眠人数错误" + error
          });
        });
    },
    setData() {
      const self = this;
      live({})
        .then(resp => {
          self.temp = resp.data.data;
        })
        .catch(function(error) {
          self.$message({
            type: "warning",
            message: "更新数据失败\n" + error
          });
        });
    },
    back() {
      const self = this;
      let sub = self.chartData;
      if(sub[0][0].data.length < 50){
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 2; j++) {
            sub[i][j].title = self.temp[i][j].title;
            sub[i][j].time.push(self.temp[i][j].time[0]);
            sub[i][j].data.push(self.temp[i][j].data[0]);
            self.temp[i][j].time.shift();
            self.temp[i][j].data.shift();
          }
        }
        self.chartData = sub;
      }
      else{
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 2; j++) {
            sub[i][j].title = self.temp[i][j].title;
            sub[i][j].time.shift()
            sub[i][j].data.shift()
            sub[i][j].time.push(self.temp[i][j].time[0]);
            sub[i][j].data.push(self.temp[i][j].data[0]);
            self.temp[i][j].time.shift();
            self.temp[i][j].data.shift();
          }
        }
        self.chartData = sub;
      } 
    }
  },
  created() {
    const self = this;
    self.setData();
    self.getSleepNum()
    setInterval(function() {
      self.setData();
    }, 5000);
    setInterval(function() { self.back()}, 1000);
    setInterval(function(){
      self.getSleepNum()
    }, 1000*60);
    
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
