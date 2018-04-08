<template>
  <div>
    <el-row>
      <el-col :span="18">
        <el-row :gutter="10">
          <el-col :span="10">
            <el-input placeholder="请输入用户名" v-model="username"> 
              <template slot="prepend">
                <icon name="user" :scale="3"></icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="time" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
          <el-col :span="4" :offset="3">
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-row>
              <el-card :body-style="{ padding: '10px' }">
                <el-row :gutter="5">
                  <el-col :span="6">姓名：{{ name }}</el-col>
                  <el-col :span="6">年龄：{{ret.userInfo.age}}</el-col>
                  <el-col :span="6">性别：{{ret.userInfo.sex}}</el-col>
                  <el-col :span="6">床位：{{ret.userInfo.bed}}</el-col>
                </el-row>
                <el-row :gutter="5">
                  <el-col :span="10">紧急联系人： {{ret.userInfo.person}}</el-col>
                  <el-col :span="10" :offset="2">联系电话： {{ret.userInfo.phone}}</el-col>
                </el-row>
                <el-row :gutter="5">
                  <el-col :span="6">入睡时间： {{ret.userInfo.begin}}</el-col>
                  <el-col :span="6">苏醒时间： {{ret.userInfo.end}}</el-col>
                  <el-col :span="6">睡眠时长： {{ret.userInfo.total}}小时</el-col>
                  <el-col :span="6">深睡时长： {{ret.userInfo.deep}}小时</el-col>
                </el-row>
                <el-row :gutter="5">
                  <el-col :span="6">平均深睡时间： {{ret.userInfo.avgDeep}}小时</el-col>
                  <el-col :span="6">平均浅睡时间：{{ret.userInfo.avgShallow}}小时</el-col>
                  <el-col :span="6">平均心率： {{ret.userInfo.avgHeart}}</el-col>
                  <el-col :span="6">平均呼吸率： {{ret.userInfo.avgBreath}}</el-col>
                </el-row>
              </el-card>
            </el-row>
            <el-row>
              <el-tabs type="card" v-model="tabItem" v-if="live">
                <el-tab-pane name="heartLive">
                  <span slot="label">
                    <icon name="heart" scale="2"></icon>实时监控
                  </span>
                  <el-row>
                    <el-col :span="12"><single-line ref="heartLive" :chartData="chartData[0]" v-if="'heartLive' === tabItem"></single-line></el-col>
                    <el-col :span="12"><single-line ref="breathLive" :chartData="chartData[1]" v-if="'heartLive' === tabItem"></single-line></el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane name="heart">
                  <span slot="label">
                    <icon name="heart" scale="2"></icon>心率
                  </span>
                  <baseline ref="heart" :chartData="yesterdayData.heart" v-if="'heart' === tabItem"></baseline>
                </el-tab-pane>
                <el-tab-pane name="breath">
                  <span slot="label">
                    <icon name="breath" scale="2"></icon>呼吸
                  </span>
                  <baseline ref="breath" :chartData="yesterdayData.breath" v-if="'breath' === tabItem"></baseline>
                </el-tab-pane>
                <el-tab-pane name="move">
                  <span slot="label"><icon name="move" scale="2"></icon>体动</span>
                  <scatter ref="move" :chartData="moveData.data" v-if="'move' === tabItem"></scatter>
                </el-tab-pane>
                <el-tab-pane name="period">
                  <span slot="label"><icon name="period" scale="2"></icon>睡眠分期</span>
                  <xRange ref="period" :chartData="periodData" v-if="'period' === tabItem" height="150px"></xRange>
                  <stackBar ref="period" :chartData="peroidTotal" v-if="'period' === tabItem" height="150px"></stackBar>
                </el-tab-pane>
              </el-tabs>
            </el-row>
        </el-row>
      </el-col>
      <el-col :span="6">
        <pie :chartData="{}"></pie>
        <radar :chartData="ret.data.radar"></radar>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import {detailPeople, heartBreath, move, peroid, live} from '../../api/api'
import Baseline from '../../components/parts/charts/Baseline'
import radar from "../../components/parts/charts/radar"
import xRange from "../../components/parts/charts/xRange"
import stackBar from "../../components/parts/charts/stackBar"
import SingleLine from "../../components/parts/charts/SingleLine"
import scatter from "../../components/parts/charts/scatter"
import pie from "../../components/parts/charts/pie"
export default {
  name: "personal",
  data() {
    return {
      username: '',
      time: new Date() - 1,
      tabItem: 'heart',
      live: true,
      name: '默认',
      ret: {},
      liveData: {},
      yesterdayData: {},
      moveData: {},
      chartData: {},
      temp: {},
      peroidTotal: {},
      pie: []
    };
  },
  components: {
    radar,
    Baseline,
    xRange,
    stackBar,
    SingleLine,
    scatter,
    pie
  },
  methods: {
    fectchData(){
      const self = this
      detailPeople({}).then( resp => {
        this.ret = resp.data
      }).catch( function(error){
        self.$message({
          type: 'danger',
          message: error
        })
      })
      heartBreath({}).then( resp => {
        this.yesterdayData = resp.data
      }).catch( function(error){
        self.$message({
          type: 'danger',
          message: error
        })
      })
      move({}).then( resp => {
        this.moveData = resp.data
      }).catch( function(error){
        self.$message({
          type: 'danger',
          message: error
        })
      })
      peroid({}).then( resp => {
        this.periodData = resp.data
      }).catch( function(error){
        self.$message({
          type: 'danger',
          message: "peroid: "+error
        })
      })
      live({}).then( resp => {
        resp.data[0].title = "心率——"+this.$route.params.name
        resp.data[1].title = "呼吸——"+this.$route.params.name
        self.chartData = resp.data
        self.temp = resp.data
      }).catch( function (error) {
        self.$message({
          type: 'danger',
          message: error,
        })
      })
    }
  },
  created() {
    const self = this
    this.name = this.$route.params.name 
    this.fectchData()
    setInterval( function () {
      let ti = new Date(new Date("2018/4/10 "+self.chartData[0].time[self.chartData[0].time.length - 1]).valueOf()+1000)
      for(let i = 0; i<2; i++){
        self.temp[i].time.shift()
        self.temp[i].time.push(ti.getHours() + ":" + ti.getMinutes() + ":" + ti.getSeconds())
        self.temp[i].data.shift()
        self.temp[i].data.push(Math.round(Math.random() * 100))
      }
      self.chartData = self.temp
    }, 1000)

    this.peroidTotal = {
      wake: [Math.round(Math.random()* 100)],
      I: [Math.round(Math.random()* 100)],
      II: [Math.round(Math.random()* 100)],
      deep: [Math.round(Math.random()* 100)],
    }
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
