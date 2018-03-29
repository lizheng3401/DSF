<template>
  <div>
      <single-line :chartData="chartData"></single-line>
  </div>
</template>

<script>
import singleLine from '../parts/charts/SingleLine'
export default {
  name: 'test',
  data () {
      return {
        chartData: []
      }
  },
  components: {
      singleLine
  },
  created () {
       const self = this
      function randomData() {
          now = new Date(+now + oneDay);
          value = value + Math.random() * 21 - 10;
          return {
              name: now.toString(),
              value: [
                  [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                  Math.round(value)
              ]
          }
      }
      var data = [];
      var now = +new Date(1997, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var value = Math.random() * 1000;
      for (var i = 0; i < 10; i++) {
          data.push(randomData());
      }

      setInterval(function () {
        for (var i = 0; i < 5; i++) {
            data.shift();
            data.push(randomData());
        }
        self.chartData = data
        console.log(self.chartData)
      }, 1000);
  }
}
</script>

<style>

</style>
