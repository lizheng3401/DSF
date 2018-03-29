<template>
  <div>
      <radar :chartData="chartData"></radar>
      <stack-bar :chartData="chartData"></stack-bar>
      <line-bar :chartData="chartData"></line-bar>
  </div>
</template>

<script>
import radar from '../parts/charts/radar'
import stackBar from '../parts/charts/stackBar'
import lineBar from '../parts/charts/lineBar'
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
      lineBar
  },
  created () {
     
  }
}
</script>

<style>

</style>
