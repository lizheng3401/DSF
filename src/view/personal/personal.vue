<template>
  <div>
    <el-row :gutter="10">
      <div class="top-input">
        <el-input placeholder="请输入用户名" style="width: 500px"> 
          <template slot="prepend"><i></i></template>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="14">
        <el-card :body-style="{ padding: '0px' }">
          something like this
        </el-card>
      </el-col>
      <el-col :span="10">
        <radar></radar>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-row>
        <el-col :span="4">体动次数： </el-col>
        <el-col :span="10">
          <el-date-picker size="small"
            type="date" placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" icon="el-icon-search" plain size="small">查询</el-button>
        </el-col>
      </el-row>
      <el-row></el-row>
    </el-row>
  </div>
</template>

<script>
import radar from '../../components/parts/charts/radar'
export default {
  name: 'personal',
  data () {
    return {
      
    }
  },
  components: {
    radar,
  },
  methods: {
    
  },
  created () {
    
  }
}
</script>

<style>
.top-input{
  text-align: center;
}
.el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
}
</style>
