<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/dark");
import { debounce } from "../../../utils/index";

export default {
  name: "xRange",
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
    setOptions: function(data) {
      var data = [];
      var startTime = +new Date();
      var categories = ['categoryA'];
      var types = [
          {name: '觉醒期', color: '#7b9ce1'},
          {name: '浅睡I期', color: '#bd6d6c'},
          {name: '浅睡II期', color: '#75d874'},
          {name: '深睡期', color: '#e0bc78'},
      ];
      var baseTime = startTime;
      for (var i = 0; i < 10; i++) {
        var typeItem = types[i%4];
        var duration = Math.round(Math.random() * 10000);
        data.push({
          name: typeItem.name,
          value: [
                0,
                baseTime,
                baseTime += duration,
                duration
          ],
          itemStyle: {
              normal: {
                color: typeItem.color
              }
          }
        });
      }
      function renderItem(params, api) {
          var start = api.coord([api.value(1), 0]);
          var end = api.coord([api.value(2), 0]);
          var height = api.size([0, 1])[1] * 2;
          return {
              type: 'rect',
              shape: echarts.graphic.clipRectByRect({
                  x: start[0],
                  y: start[1] - height / 2,
                  width: end[0] - start[0],
                  height: height
              }, {
                  x: params.coordSys.x,
                  y: params.coordSys.y,
                  width: params.coordSys.width,
                  height: params.coordSys.height
              }),
              style: api.style()
          };
      }
      this.chart.setOption({
        tooltip: {
            formatter: function (params) {
                return params.marker + params.name + ': ' + params.value[3] + ' s';
            }
        },
        // title: {
        //     text: '',
        //     left: 'center'
        // },
        grid: {
            top: '5%',
            left: '8%',
            right: '8%',
        },
        xAxis: {
            name: '时间',
            min: startTime,
            scale: true,
            axisLabel: {
                formatter: function (val) {
                    return Math.max(0, val - startTime) + ' ms';
                }
            }
        },
        yAxis: {
            show: false,
        },  
        series: [{
            type: 'custom',
            renderItem: renderItem,
            itemStyle: {
                normal: {
                    opacity: 0.8
                }
            },
            encode: {
                x: [1, 2],
            },
            data: data
        }]
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
