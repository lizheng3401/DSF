<template>
  <div>
    <el-col class="carousel" :span="20">
      <el-carousel :interval="5000" arrow="always" height="555px">
        <el-carousel-item v-for="item in 4" :key="item">
          <!-- <single-line :chart-data="{}"></single-line> -->
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
  // import SingleLine from '../../components/parts/charts/SingleLine.vue'
  export default {
    name: 'live',
    components:{
      scorllBar,
      // SingleLine
    },
    data(){
      return {
        users: []
      }
    },
    
    created(){
      
    }
  };
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
