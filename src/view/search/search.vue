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
  }
}
</script>

<style>

</style>
