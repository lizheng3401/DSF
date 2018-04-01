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
    setOptions: function({ startTime, data }={}) {
      
      function renderItem(params, api) {
        console.log(JSON.stringify(params, null, 2))
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
      console.log(JSON.stringify(data[0], null, 2))
      this.chart.setOption({
        tooltip: {
            formatter: function (params) {
                return params.marker + params.name + ': ' + params.value[3] + ' s';
            }
        },
        grid: {
            top: '5%',
            left: '5%',
            right: '5%',
        },
        xAxis: {
            type: 'category',
            name: '时间',
            min: startTime,
            scale: true,
            axisLabel: {
                formatter: function (val) {
                  let date = new Date(val)              
                  console.log(startTime)
                  console.log(date)
                  return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
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
