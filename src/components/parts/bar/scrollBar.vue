<template>
  <div class="scroll-bar" ref="noCharge">
    <el-card v-for="(user,index) in users" :key="index" class="box-card" :body-style="{padding: '5px'}" v-if="users.length > 0">
      <el-row>
        <el-col :span="10">
          <strong>{{ user.login }}</strong>
        </el-col>
        <el-col :span="5" :offset="4">
          <i class="el-icon-star-on">75</i>
        </el-col>
        <el-col :span="5">
          <i class="el-icon-news">16</i>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <p>异常原因<i class="el-icon-warning"></i>心率不齐</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="danger" size="mini" style="width: 100%" @click="handlException(user)">待处理</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import MugenScroll from "vue-mugen-scroll";
export default {
  name: "scrll-bar",
  data: function() {
    return {
      users: [],
      loading: false
    };
  },
  components: {
    MugenScroll
  },
  methods: {
    fetchData() {
      const self = this;
      this.loading = true;
      this.$http({
        url: "https://api.github.com/users",
        methods: "get"
      })
        .then(resp => {
          for (let i = 0; i < 7; i++) {
            self.users.push(resp.data[i]);
          }
        })
        .catch(function(err) {
          self.$message({
            message: err,
            type: "danger"
          });
        });
      this.loading = false;
    },
    handlException(user){
      this.users.splice(0,1)
      this.$message({
        message: user.login+"处理成功",
        type: "success"
      })
    },
  },
  created: function() {
    this.fetchData();
  }
};
</script>

<style scoped>
.scroll-bar {
  height: 300px;
}
.box-card {
  padding: 0px;
}
</style>
