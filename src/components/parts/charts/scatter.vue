<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/dark')
  import {debounce} from '../../../utils/index'

  export default {
    name: "single-line",
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Array
      }
    },
    data: function () {
      return {
        chart: null
      }
    },
    mounted: function () {
      this.initChart();
      if(this.autoResize){
        this.__resizeHanlder = debounce( () => {
          if (this.chart){
            this.chart.resize();
          }
        }, 10);
        window.addEventListener('resize', this.__resizeHanlder)
      }
    },
    beforeDestroy: function () {
      if(!this.chart){
        return
      }
      if(this.autoResize){
        window.removeEventListener('resize', this.__resizeHanlder)
      }

      this.chart.dispose();
      this.chart = null
    },
    watch: {
      chartData: {
        deep: true,
        handler: function (val) {
          this.setOptions(val);
        }
      }
    },
    methods: {
      setOptions: function (data){
        console.log(data)
        console.log(typeof(data))
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
          },
          grid: {
            top: '5%',
            left: '8%',
            right: '8%',
          },
          toolbox: {
            feature: {
              restore: {},
            }
          },
          dataZoom: {
            show: true,
            realtime: true,
            start: 0,
            end: 50
          },
          xAxis: {
            type: 'category',
          },
          yAxis: {
            min: 0.5
          },
          series: [{
              name: '体动次数',
              type: 'scatter',
              symbolSize: 10,
              data: data,
          }]
        })
      },
      initChart: function () {
        this.chart = echarts.init(this.$el);
        this.setOptions(this.chartData)
      }
    },
  }
</script>

<style scoped>

</style>
