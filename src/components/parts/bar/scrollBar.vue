<template>
  <div class="scroll-bar" ref="noCharge">
    <el-card v-for="(user,index) in users" :key="index" :body-style="{padding: '5px'}" v-if="users.length > 0">
      <el-row>
        <el-col :span="10">
          <strong style="line-height: 20px">{{ user.login }}</strong>
        </el-col>
        <el-col :span="5" :offset="3">
          <icon name="heart" :scale="2"></icon>75
        </el-col>
        <el-col :span="5" :offset="1">
          <icon name="breath" :scale="2"></icon>16
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <p><i class="el-icon-warning"></i>心率不齐</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-tag type="danger" size="medium" style="width: 100%; text-aligin: center;">状态：危险</el-tag>
        </el-col>
        <el-col :span="12">
          <el-button type="danger" size="mini" @click="handlException(user)" style="width: 100%;">待处理</el-button>
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
      }).then(resp => {
          for (let i = 0; i < 7; i++) {
            self.users.push(resp.data[i]);
          }
      }).catch(function(err) {
          self.$message({
            showClose: true,
            center: true,
            message: err,
            type: "error"
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
    const self = this
    this.fetchData();
    setInterval( function () {
      self.users.unshift({login: 'abcd'})
      self.users.pop()
    }, 1000)
  }
};
</script>

<style scoped>
.scroll-bar {
  height: 300px;
}
</style>
