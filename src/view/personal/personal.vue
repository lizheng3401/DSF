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
            <el-button type="primary" icon="el-icon-search" @click="search(username)">查询</el-button>
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
      chartData: [],
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
    },
    updateData(){
      const self = this;
      let time = []
      let heart = []
      let breath = []
      this.$http({
        url: '/api/RealTimeData?Phone=18081979297',
        method: 'get'
      }).then( resp => {
        const temp = {
          Timestamp: resp.data.Timestamp,
          BreathRate: resp.data.BreathRate.replace('[', '').replace(']', '').split(','),
          HeartRate: resp.data.HeartRate.replace('[', '').replace(']', '').split(','),
        }
        let date = new Date(temp.Timestamp*1000)
        for(let i = 0; i < 10; i++){
          time.push(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
          date = new Date(date.valueOf() + 1000)
          heart.push(parseInt(temp.HeartRate[i]))
          breath.push(parseInt(temp.BreathRate[i]))
        }
        self.chartData = self.fetchData2(time, heart, breath)
      }).catch( function (error) {
        console.log(error)
      })
    },
    fetchData2(time, heart, breath){
      let H = {title: '心率'}
      let B = {title: '呼吸率'}
      
      if(this.chartData.length === 0){
        H.time = time;
        H.data = heart;
        B.time = time;
        B.data = breath;
        return [H, B]
      } else if(this.chartData.length > 0 & this.chartData[0].data.length < 50){
        H.time = this.chartData[0].time.concat(time);
        H.data = this.chartData[0].data.concat(heart);
        B.time = this.chartData[1].time.concat(time);
        B.data = this.chartData[1].data.concat(breath);
        return [H, B]
      } else {
        const temp = this.chartData
        try {
          for(let i = 0; i < 10; i++){
            temp[0].time.shift();
            temp[0].data.shift();
            temp[1].time.shift();
            temp[1].data.shift();
            temp[0].time.push(time[i]);
            temp[0].data.push(heart[i]);
            temp[1].time.push(time[i]);
            temp[1].data.push(breath[i]);
          }
        } catch (error) {
          console.log(error);
        }
        return temp
      }
    },
    search(username){
      this.$router.push(`/personal/${username}`);
      window.location.reload();
    }
  },
  created() {
    const self = this
    this.name = this.$route.params.name 
    this.fectchData()
    this.updateData()
    setInterval(function () {
      self.updateData()
    }, 10000)

    this.peroidTotal = {
      wake: [36],
      I: [180],
      II: [150],
      deep: [120],
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
