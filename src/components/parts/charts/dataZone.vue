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
    setOptions: function(data) {
      this.chart.setOption({
        title : {
            text: '雨量流量关系图',
            subtext: '数据来自西安兰特水电测控技术有限公司',
            x: 'center',
            align: 'right'
        },
        grid: {
            bottom: 80
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
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
        legend: {
            data:['流量'],
            x: 'left'
        },
        dataZoom: {
          show: true,
          realtime: true,
          start: 65,
          end: 85
        },
        xAxis : {
          type : 'category',
          boundaryGap : false,
          axisLine: {onZero: false},
          data :[1,2,3,4,5,6,7,8,9,10]
        },
        yAxis: {
          name: '人数',
          type: 'value',
        },
        series: [
            {
                name:'异常人数',
                type:'line',
                animation: true,
                areaStyle: {
                    normal: {}
                },
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                data:[10,9,8,7,6,5,4,3,2,1]
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
