<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/dark");
import { debounce } from "../../../utils/index";

export default {
  name: "dataZone",
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
    setOptions: function({ time, data } = {}) {
      this.chart.setOption({
        title : {
            text: '异常人数',
            subtext: '数据来自西安兰特水电测控技术有限公司',
            x: 'center',
            align: 'right'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        dataZoom: {
          show: true,
          realtime: true,
          start: 20,
          end: 50
        },
        grid: {
            top: '5%',
            left: '8%',
            right: '8%',
        },
        xAxis : {
          type : 'category',
          boundaryGap : false,
          data: time
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
            {
                name:'异常人数',
                type:'line',
                smooth: true,
                animation: true,
                areaStyle: {
                    normal: {}
                },
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                data:data
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
