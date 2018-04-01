<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/dark");
import { debounce } from "../../../utils/index";

export default {
  name: "radar",
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
      default: "250px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array
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
        tooltip: {},
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
              }
            },
            indicator: [
              { name: '心率', max: 100},
              { name: '呼吸率', max: 20},
              { name: '体动', max: 100},
              { name: '深睡眠时长', max: 5},
              { name: '入睡时间', max: 3},
              { name: '觉醒时间', max: 2}
            ]
        },
        series: [{
            name: '睡眠评分',
            type: 'radar',
            areaStyle: {normal: {color: '#666'}},
            data : [{
              value: data,
              name: '评分'
            }]
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
