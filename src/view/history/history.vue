<template>
  <div>
    <el-row>
      <el-col :span="1">
        <span>历<br>史<br>异<br>常<br>人<br>数<br>变<br>化</span>
      </el-col>
      <el-col :span="23">
        <data-zone :chartData="topData"></data-zone>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="1">
        <span>昨<br>晚<br>入<br>睡<br>趋<br>势<br>变<br>化</span>
      </el-col>
      <el-col :span="23">
        <line-bar :chartData="leftData"></line-bar>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="1">
        <span>平<br>均<br>睡<br>眠<br>时<br>长<br>变<br>化</span>
      </el-col>
      <el-col :span="23">
        <base-bar :chartData="bottomData"></base-bar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cookie from "../../utils/cookie.js";
import { unhealthPeople, sleepPeople, periodPeople } from "../../api/api";
import dataZone from "../../components/parts/charts/dataZone";
import lineBar from "../../components/parts/charts/lineBar";
import baseBar from "../../components/parts/charts/BaseBar";
export default {
  name: "history",
  data() {
    return {
      topData: {},
      leftData: {},
      bottomData: {
        time: [],
        peroid: {}
      }
    };
  },
  components: {
    dataZone,
    lineBar,
    baseBar
  },
  methods: {
    fetchData() {
      const self = this;
      unhealthPeople({})
        .then(resp => {
          this.topData = resp.data;
        })
        .catch(function(error) {
          self.$message({
            type: "danger",
            message: error
          });
        });
      sleepPeople({})
        .then(resp => {
          this.leftData = resp.data;
        })
        .catch(function(error) {
          self.$message({
            type: "danger",
            message: error
          });
        });
      periodPeople({})
        .then(resp => {
          this.bottomData = resp.data;
        })
        .catch(function(error) {
          self.$message({
            type: "danger",
            message: error
          });
        });
    }
  },
  created() {
   /*  const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    }); */
    let flag = cookie.getCookie("name");
    if(!flag)
    {
      this.$router.push("/");
    }
    this.fetchData();
    /* loading.close(); */
  }
};
</script>

<style scoped>
span{
  font-size:25px;
  text-align:"center";
  vertical-align: "center";
}
</style>
