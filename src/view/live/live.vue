<template>
  <div>
    <el-col class="carousel" :span="20" >
      <el-carousel :interval="5000" height="555px" :initial-index="0">
        <el-carousel-item v-for="item in 4" :key="item">
          <template slot-scope="scope">
            <single-line :chartData="chartData" ></single-line>
          </template>
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <el-col :span="4">
     <scorll-bar></scorll-bar>
    </el-col>
  </div>
</template>

<script>
  import scorllBar from '../../components/parts/bar/scrollBar.vue'
  import SingleLine from '../../components/parts/charts/SingleLine.vue'
  export default {
    name: 'live',
    components:{
      scorllBar,
      SingleLine
    },
    data(){
      return {
        users: [],
        chartData: []
      }
    },
    methods: {
     
      fetchData(){

      }
    },
    created(){
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
      for (var i = 0; i < 100; i++) {
          data.push(randomData());
      }
      setInterval(function () {
        for (var i = 0; i < 5; i++) {
            data.shift();
            data.push(randomData());
        }
        self.chartData = data
      }, 1000);
    }
  };
</script>

<style scoped>
  canvas{
    width:500px
  }
</style>
