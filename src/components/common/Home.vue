<template>
  <div class="home">
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

</style>
