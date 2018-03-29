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
        default: '900px'
      },
      height: {
        type: String,
        default: '555px'
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
      setOptions: function (data) {
        this.chart.setOption({
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          legend: {
              data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis:  {
              type: 'value'
          },
          yAxis: {
              type: 'category',
              data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          series: [
              {
                  name: '直接访问',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      normal: {
                          show: true,
                          position: 'insideRight'
                      }
                  },
                  data: [320, 302, 301, 334, 390, 330, 320]
              },
              {
                  name: '邮件营销',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      normal: {
                          show: true,
                          position: 'insideRight'
                      }
                  },
                  data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                  name: '联盟广告',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      normal: {
                          show: true,
                          position: 'insideRight'
                      }
                  },
                  data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                  name: '视频广告',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      normal: {
                          show: true,
                          position: 'insideRight'
                      }
                  },
                  data: [150, 212, 201, 154, 190, 330, 410]
              },
              {
                  name: '搜索引擎',
                  type: 'bar',
                  stack: '总量',
                  label: {
                      normal: {
                          show: true,
                          position: 'insideRight'
                      }
                  },
                  data: [820, 832, 901, 934, 1290, 1330, 1320]
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
