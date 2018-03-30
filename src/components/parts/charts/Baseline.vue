<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/dark')
  import {debounce} from '../../../utils/index'

  export default {
    name: "base-line",
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
      setOptions: function ({ time, data } = {}) {
        this.chart.setOption({
          title: {
            text: ''
          },
          grid: {
            top: '5%',
            left: '5%',
            right: '5%',
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
              }
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
            type: 'time',
            boundaryGap: false,
            min: 'dataMin',
            data: ['13:15','13:16', '13:17', '13:18']
          },
          yAxis: {
            type: 'value',
            min: 30
          },
          series: {
            name: '心率',
            type: 'line',
            data:  [45,78,56,75],
          }
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
