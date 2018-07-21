<template>
  <div>
    <el-input placeholder="请输入用户名" v-model="username" @keyup.enter.native="search(username)">
      <template slot="prepend">
        <icon name="user" :scale="3"></icon>
      </template>
      <el-button slot="append" icon="el-icon-search" @click="search(username)"></el-button>
    </el-input>
  </div>
</template>

<script>
import cookie from "../../utils/cookie.js";
export default {
  name: 'search',
  data () {
    return {
      username: '',
    }
  },
  methods: {
    search(username){
      this.$router.push(`/personal/${username}`)
    }
  },
  created(){
    let flag = cookie.getCookie("name");
    if(!flag)
    {
      this.$router.push("/");
    }
  }
}
</script>

<style>
</style>