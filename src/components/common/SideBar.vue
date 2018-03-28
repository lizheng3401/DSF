<template>
  <div class="sidebar">
    <el-menu default-active="1" theme="dark" class="el-menu-vertical-demo"
             unique-opened router
             background-color="#242f42" text-color="#fff" active-text-color="#ffd04b">
      <template v-for="(menuItem,index) in menu">
        <el-submenu v-if="menuItem.subs" :index="menuItem.index" :key="index">
          <span slot="title"><i :class="menuItem.icon"></i>{{menuItem.title}}</span>
          <el-menu-item v-for="(subsItem, i) in menuItem.subs" :key="i" :index="subsItem.index">
            {{subsItem.title}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="menuItem.index" :key="index">
          <span><i :class="menuItem.icon"></i>{{menuItem.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "side-bar",
    data: function () {
      return {
        menu: [
          {
            icon: 'el-icon-setting',
            index: '/live',
            title: '实时监控'
          },
          {
            icon: 'el-icon-menu',
            index: 'info',
            title: '后台信息一览表',
            subs: [
              {
                index: '/index/info/users',
                title: '用户信息'
              },
              {
                index: '/index/info/devices',
                title: '设备信息'
              }
            ]
          },
          {
            icon: 'el-icon-date',
            index: '/index/abnormal',
            title: '异常信息',
            subs: [
              {
                index: '/index/abnormal/users/new',
                title: '新增异常名单'
              },
              {
                index: '/index/abnormal/users/old',
                title: '已有异常名单'
              }
            ]
          },
          {
            icon: 'el-icon-star-on',
            index: '/index/history',
            title: '历史数据'
          },
          {
            icon: 'el-icon-upload2',
            index: '/index/yesterday',
            title: '昨晚睡眠情况'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .sidebar{
    display: block;
    position: absolute;
    width: 200px;
    left: 0;
    top: 70px;
    bottom:0;
  }
  .sidebar > ul {
    height:100%;
  }
</style>
