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
      isShow: 0
    };
  },
  methods: {
    fetchData() {},
    show(prev,next){
      this.isShow = prev+1
    }
  },
  created() {
    const self = this;
    function randomData() {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
          Math.round(value)
        ]
      };
    }
    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 100; i++) {
      data.push(randomData());
    }
    setInterval(function() {
      for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
      }
      self.chartData = data;
    }, 1000);

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
