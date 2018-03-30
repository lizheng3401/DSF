<template>
  <div>
      <radar :chartData="chartData"></radar>
      <stack-bar :chartData="chartData"></stack-bar>
      <line-bar :chartData="chartData"></line-bar>
      <x-range :chartData="chartData"></x-range>
      <data-zone :chartData="chartData"></data-zone>
  </div>
</template>

<script>
import radar from '../parts/charts/radar'
import stackBar from '../parts/charts/stackBar'
import lineBar from '../parts/charts/lineBar'
import xRange from '../parts/charts/xRange'
import dataZone from '../parts/charts/dataZone'

export default {
  name: 'test',
  data () {
      return {
        chartData: {}
      }
  },
  components: {
      radar,
      stackBar,
      lineBar,
      xRange,
      dataZone
  },
  created () {
     
  }
}
</script>

<style>

</style>
