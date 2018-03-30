<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="10">
        <el-input placeholder="请输入用户名"> 
          <template slot="prepend">
            <icon name="user" :scale="3"></icon>
          </template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-date-picker v-model="time" type="date" placeholder="选择日期"></el-date-picker>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button type="primary" icon="el-icon-search">查询</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="16">
        <el-row>
          <el-card :body-style="{ padding: '10px' }">
            <el-row :gutter="5">
              <el-col :span="6">姓名：默认姓名</el-col>
              <el-col :span="6">年龄：默认年龄</el-col>
              <el-col :span="6">性别：默认性别</el-col>
              <el-col :span="6">床位：默认床位</el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="10">紧急联系人： 默认联系人</el-col>
              <el-col :span="10" :offset="2">联系电话： 默认联系电话</el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="6">入睡时间： 11:29</el-col>
              <el-col :span="6">苏醒时间： 08:29</el-col>
              <el-col :span="6">睡眠时长： 9.5小时</el-col>
              <el-col :span="6">深睡时长： 2.5小时</el-col>
            </el-row>
          </el-card>
        </el-row>
        <el-row>
          <el-tabs type="card" v-model="tabItem">
            <el-tab-pane name="heart">
              <span slot="label"><icon name="heart" scale="2"></icon>心率</span>
              <baseline ref="heart" :chartData="{}" v-if="'heart' === tabItem"></baseline>
            </el-tab-pane>
            <el-tab-pane name="breath">
              <span slot="label"><icon name="breath" scale="2"></icon>呼吸</span>
              <baseline ref="breath" :chartData="{}" v-if="'breath' === tabItem"></baseline>
            </el-tab-pane>
            <el-tab-pane label="体动" name="move">
              <span slot="label"><icon name="move" scale="2"></icon>体动</span>
              <baseline ref="move" :chartData="{}" v-if="'move' === tabItem"></baseline>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-col>
      <el-col :span="8">
        <radar></radar>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-row>
        <el-col :span="4"></el-col>
      </el-row>
      <el-row></el-row>
    </el-row>
  </div>
</template>

<script>
import Baseline from '../../components/parts/charts/Baseline'
import radar from "../../components/parts/charts/radar";
export default {
  name: "personal",
  data() {
    return {
      time: new Date() - 1,
      tabItem: 'heart',
    };
  },
  components: {
    radar,
    Baseline,
  },
  methods: {
    
  },
  created() {
  }
};
</script>

<style>
.el-row { 
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
