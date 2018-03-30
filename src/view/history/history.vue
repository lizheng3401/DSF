<template>
  <div>
    <el-row>
      <data-zone :chartData="topData"></data-zone>
    </el-row>
    <el-row>
      
    </el-row>
    <el-row>

    </el-row>
  </div>
</template>

<script>
import dataZone from '../../components/parts/charts/dataZone'

export default {
  name: 'history',
  data(){
    return {
      topData: {},
    }
  },
  components:{
    dataZone
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
  }
}
</script>

<style scoped>

</style>
