<template>
  <div class="main_bg">
    <template v-if="login">
      <Top></Top>
      <side-bar></side-bar>
    </template>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import Top from '@/components/common/Top'
  import SideBar from '@/components/common/SideBar'
  export default {
    name: "home",
    data: function () {
      return {
        login: true
      }
    },
    components:{
      Top,
      SideBar
    },
  }
</script>

<style scoped>
.main_bg{
  background-image: url(../../../static/images/bg_main.png);
  background-repeat:no repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  height: 100%;
}
</style>
