<template>
  <div class="scroll-bar">
    <transition-group name="list-complete" >
    <el-card v-for="(user,index) in users" :key="index" :body-style="{padding: '5px'}" v-if="users.length != 0" class="list-complete-item">
      <el-row>
        <el-col :span="10">
          <strong style="line-height: 20px">{{ user.name }}</strong>
        </el-col>
        <el-col :span="5" :offset="3">
          <icon name="heart" :scale="2"></icon>{{ user.heart}}
        </el-col>
        <el-col :span="5" :offset="1">
          <icon name="breath" :scale="2"></icon>{{ user.breath}}
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <p><i class="el-icon-warning"></i>{{ user.reason}}</p>
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
    </transition-group>
  </div>
</template>

<script>
import {newUnhealthPeople} from '../../../api/api'
export default {
  name: "scrll-bar",
  data: function() {
    return {
      users: [],
      loading: false,
    };
  },
  methods: {
    fetchData() {
      const self = this
      newUnhealthPeople({}).then( resp => {
        self.users = resp.data.Data
      }).catch( function (error) {
        self.$message({
          type: 'danger',
          message: error
        })
      })
    },
    handlException(user){
      this.$router.push(`/personal/${user.name}`)
    },
  },
  created: function() {
    this.fetchData();
    
  }
};
</script>

<style scoped>
.scroll-bar {
  height: 555px;
}
</style>
