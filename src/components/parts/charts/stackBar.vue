<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/dark')
  import {debounce} from '../../../utils/index'

  export default {
    name: "stackBar",
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
      setOptions: function (data) {
        this.chart.setOption({
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          legend: {
              data: null
          },
          grid: {
            top: '5%',
            left: '8%',
            right: '8%',
          },
          xAxis:  {
              type: 'value',
              name: '小时'
          },
          yAxis: {
              type: 'category',
              data: ['']
          },
          series: [
              {
                  // name: '直接访问',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      normal: {
                          show: true,
                          position: 'insideRight'
                      }
                  },
                  data: [320]
              },
              {
                  // name: '邮件营销',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      normal: {
                          show: true,
                          position: 'insideRight'
                      }
                  },
                  data: [120]
              },
              {
                  // name: '联盟广告',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      normal: {
                          show: true,
                          position: 'insideRight'
                      }
                  },
                  data: [220]
              },
              {
                  // name: '视频广告',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      normal: {
                          show: true,
                          position: 'insideRight'
                      }
                  },
                  data: [150]
              },
              {
                  // name: '搜索引擎',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      normal: {
                          show: true,
                          position: 'insideRight'
                      }
                  },
                  data: [820]
              }
          ]
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
