<template>
  <div class="scroll-bar">
    <div class="users" v-if="users.length > 0">
        <div v-for="(user,index) in users" :key="index">
          <img :src="user.avatar_url" height="40" alt="">
          <span>{{ user.login }}</span>
        </div>
    </div>
    <mugen-scroll :handler="fetchData" :should-handle="!loading">
      loading...
    </mugen-scroll>
  </div>
</template>

<script>
  import MugenScroll from 'vue-mugen-scroll'
  export default {
    name: "scrll-bar",
    data: function() {
      return {
        users: [],
        loading: false
      }
    },
    components:{
      MugenScroll
    },
    methods: {
       fetchData() {
        const self = this
        this.loading = true
        this.$http({
          url: 'https://api.github.com/users',
          methods: 'get',
        }).then( resp => {
          self.users = resp.data
        }).catch( function (err) {
          self.$message("error");
        })
        this.loading = false
      }
    },
    created: function() {
      this.fetchData()
    }
  };
</script>

<style scoped>
  .users{
    height:100%
  }
</style>
