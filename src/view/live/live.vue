<template>
  <div>
    <el-col class="carousel" :span="20">
      <el-row>
        <el-col :span="4"><el-tag size="small">已睡：789</el-tag> <el-tag size="small">未睡：24</el-tag></el-col>
        <el-col :span="16">
          <el-progress :text-inside="true" :stroke-width="18" :percentage="45"></el-progress>
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
      isShow: 0
    };
  },
  methods: {
    fetchData() {
      const self = this
      live({}).then( resp => {
        self.chartData = resp.data
        console.log(JSON.stringify(self.chartData, null, 2))
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
    this.fetchData()
    console.log(JSON.stringify(this.chartData.data, null, 2))
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
