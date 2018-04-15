<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/dark')
  import {debounce} from '../../../utils/index'

  export default {
    name: "base-bar",
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
        type: Object
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
      resize(){
        if(this.chart)
        {
          console.log(this)
          this.chart.resize()
        }
        
      },
      setOptions: function ({ time, peroid } = {}) {
        console.log(time, peroid)
        this.chart.setOption({
          grid: {
            top: '5%',
            left: '4%',
            right: '4%',
          },
          tooltip : {
            trigger: 'axis',
          },
          dataZoom: {
            show: true,
            realtime: true,
            start: 20,
            end: 50
          },
          xAxis: {
            type: 'category',
            data: time
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            name: '浅睡',
            type: 'bar',
            data:  peroid.shallow,
          },{
            name: '深睡',
            type: 'bar',
            data:  peroid.deep
          },{
            name: '睡眠时长',
            type: 'bar',
            data:  peroid.total,
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
