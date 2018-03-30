<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/dark");
import { debounce } from "../../../utils/index";

export default {
  name: "lineBar",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data: function() {
    return {
      chart: null
    };
  },
  mounted: function() {
    this.initChart();
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 10);
      window.addEventListener("resize", this.__resizeHanlder);
    }
  },
  beforeDestroy: function() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHanlder);
    }

    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    chartData: {
      deep: true,
      handler: function(val) {
        this.setOptions(val);
      }
    }
  },
  methods: {
    setOptions: function({time, data} = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              animation: false,
              label: {
                backgroundColor: '#505765'
              }
          }
        },
        xAxis: [
          {
            type: "category",
            data: time
          }
        ],
        legend: {

        },
        yAxis: [
          {
            type: "value",
            name: "人数",
            // interval: 50,
            axisLabel: {
              formatter: "{value} "
            }
          }
        ],
        series: [
          {
            name: "入睡人数",
            type: "bar",
            /*itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#fe6262'},
                                            {offset: 0.5, color: '#fe4141'},
                                            {offset: 1, color: '#fe1818'}
                                        ]
                                    ),
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#fe6262'},
                                            {offset: 0.5, color: '#fe4141'},
                                            {offset: 1, color: '#fe1818'}
                                        ]
                                    )
                                }
                            },*/

            /*设置柱状图颜色*/
            itemStyle: {
              normal: {
                /*信息显示方式*/
                label: {
                  show: true,
                  position: "top",
                  formatter: "{c}"
                }
              }
            },
            data: data
          },
          {
            name: "折线",
            type: "line",
            smooth: true,
            itemStyle: {
              /*设置折线颜色*/
              normal: {
                /* color:'#c4cddc'*/
              }
            },
            data: data
          }
        ]
      });
    },
    initChart: function() {
      this.chart = echarts.init(this.$el);
      this.setOptions(this.chartData);
    }
  }
};
</script>

<style scoped>

</style>
