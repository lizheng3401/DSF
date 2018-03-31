<template>
  <div>
    <el-row>
      <data-zone :chartData="topData" height="300px"></data-zone>
    </el-row>
    <el-row>
      <line-bar :chartData="leftData"></line-bar>
    </el-row>
    <el-row>
      <base-bar :chartData="bottomData"></base-bar>
    </el-row>
  </div>
</template>

<script>
import {unhealthPeople, sleepPeople, periodPeople} from '../../api/api'
import dataZone from '../../components/parts/charts/dataZone'
import lineBar from '../../components/parts/charts/lineBar'
import baseBar from '../../components/parts/charts/BaseBar'
export default {
  name: 'history',
  data(){
    return {
      topData: {},
      leftData: {},
      bottomData: {}
    }
  },
  components:{
    dataZone,
    lineBar,
    baseBar
  },
  methods:{
    fetchData(){
      const self = this
      unhealthPeople({}).then( resp => {
        this.topData = resp.data
      }).catch( function (error) {
        self.$message({
          type: 'danger',
          message: error
        })
      })
      sleepPeople({}).then( resp => {
        this.leftData = resp.data
      }).catch( function (error) {
        self.$message({
          type: 'danger',
          message: error
        })
      })
      periodPeople({}).then( resp => {
        this.bottomData = resp.data
      }).catch( function (error) {
        self.$message({
          type: 'danger',
          message: error
        })
      })
    }
  },
  created(){
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    this.fetchData()
    loading.close()
  }
}
</script>

<style scoped>

</style>
