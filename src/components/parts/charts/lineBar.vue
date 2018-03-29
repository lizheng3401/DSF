<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/dark");
import { debounce } from "../../../utils/index";

export default {
  name: "single-line",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "900px"
    },
    height: {
      type: String,
      default: "555px"
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
    setOptions: function(data) {
      this.chart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["降水量", "折线"]
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "水量/ml",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} "
            }
          }
        ],
        series: [
          {
            name: "降水量",
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
                  formatter: "{b}\n{c}"
                }
              }
            },
            data: [50, 75, 100, 150, 200, 250, 150, 100, 95, 160, 50, 45]
          },
          {
            name: "折线",
            type: "line",
            itemStyle: {
              /*设置折线颜色*/
              normal: {
                /* color:'#c4cddc'*/
              }
            },
            data: [50, 75, 100, 150, 200, 250, 150, 100, 95, 160, 50, 45]
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
