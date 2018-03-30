<template>
  <div>
    <el-row>
      <data-zone :chartData="topData" height="300px"></data-zone>
    </el-row>
    <el-row>
      <el-col :span="12">
        <line-bar :chartData="leftData"></line-bar>
      </el-col>
      <el-col :span="12">
        <base-bar :chartData="{}"></base-bar>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <base-bar :chartData="{}"></base-bar>
      </el-col>
      <el-col :span="12">
        <base-bar :chartData="{}"></base-bar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dataZone from '../../components/parts/charts/dataZone'
import lineBar from '../../components/parts/charts/lineBar'
import baseBar from '../../components/parts/charts/BaseBar'
export default {
  name: 'history',
  data(){
    return {
      topData: {},
      leftData: {},
      rightData: {},
      deepS: {},
      lightS: {}
    }
  },
  components:{
    dataZone,
    lineBar,
    baseBar
  },
  methods:{

  },
  created(){
    var date = new Date()
    let time = []
    let data = []
    for(let i = 0; i < 100; i++){
      date = new Date(date.valueOf() + 60*1000*60)
      time.push(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes())
      data.push(Math.random()*1000)
    }
    this.topData = {
      time,
      data
    }
    console.log(this.topData)
    data = []
    time = []
    for(let i = 0; i < 10; i++){
      date = new Date(date.valueOf() + 60*1000*60)
      time.push(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes())
      data.push(Math.random()*1000)
    }
    this.leftData = {
      time,
      data
    }
  }
}
</script>

<style scoped>

</style>
