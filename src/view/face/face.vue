<template>
  <div class="main_bg">
    <div class="header">
      <div class="logo">SafeSleep睡眠安全监护</div>
      <div class="word">身份认证</div>
      <div class="user-info">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{username}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-container>
      <el-main v-if="isFace">
        <el-row>
          <el-col :span="10" :offset="3">
            <video ref="video" width="400" height="300"></video>
          </el-col>
          <el-col :span="10">
            <canvas ref='canvas' width='400' height='300' v-show="false"></canvas>
            <img ref='img' src=''>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="4">
            <el-button ref='btn' type="primary" @click="takePic" :autofocus="true">点击按钮,截取图片作为识别照片</el-button>
          </el-col>
          <el-col :span="4" :offset="6">
            <el-button ref='btn' type="primary" @click="upload" :autofocus="true" v-show="showPic">点击上传面部照片进行识别认证</el-button>
          </el-col>
        </el-row>
      </el-main>
      <el-main v-if="!isFace">
        <el-row style="margin: 0px auto;">
          <el-col :span="12" :offset="12">
            <el-card class="Login" :body-style="{padding: '10px'}">
              <div slot="header" class="clearfix">
                <h3>登录</h3>
              </div>
              <el-form ref="ruleForm" :model="ruleForm" label-position="right" :rules="rules">
                <el-form-item prop="username">
                  <el-input v-model="ruleForm.username" placeholder="请输入账户">
                  </el-input>
                </el-form-item>
                <el-form-item prop="sms">
                  <el-row>
                    <el-col :span="18" >
                      <el-input v-model="ruleForm.sms" placeholder="请输入短信验证码">
                      </el-input>
                    </el-col>
                    <el-col :span="5">
                      <el-button v-model="captcha" @click="teleSms">{{smsNote}}</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item style="line-height:0px">
                  <el-button type="primary" style="width: 100%">
                    <a :href="item.link" 
                          target="showHere" 
                          style="text-decoration: none;color:white;"
                          @click="showIframe">
                          <div>登录</div>
                    </a>
                  </el-button>
                  <iframe v-show="iframeState" id="show-iframe"
                        width="330" height="255"
                        frameborder=0 name="showHere" 
                        style="margin: 0px 55px;"
                        scrolling=auto src=""></iframe>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <div>
    </div>
  </div>
</template>

<script>
import cookie from "../../utils/cookie.js";
import Top from "../../components/common/Top";
import { face } from "../../api/api";
export default {
  name: "face",
  data() {
    return {
      username: "",
      showPic: false,
      pic: undefined,
      isFace: true,
      iframeState:false,
      sms:"",
      captcha: "",
      smsNote: "获取验证码",
      count: '',
      timer: null,
      item: {
          name: '滑动验证',
          link: '/static/captcha.html'
      },
      ruleForm: {
        username: "",
        sms: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        sms: [{ required: true, message: "验证码为空", trigger: "blur" }]
      },
      mediaStreamTrack: {},
    };
  },
  components: {
    Top
  },
  methods: {
    takePic: function() {
      this.$refs.canvas
        .getContext("2d")
        .drawImage(this.$refs.video, 0, 0, 400, 300);
      this.$refs.img.src = this.$refs.canvas.toDataURL("image/png");
      this.pic = this.$refs.canvas.toDataURL("image/png");
      this.showPic = true;
      this.$message({
        type: "success",
        message: "图片获取成功",
        duration: 1000
      });
    },
    upload: function() {
      const _this = this;
      face({ data: this.pic })
        .then(resp => {
          _this.$message({
            type: "success",
            message: "正在认证"
          });
          setTimeout(function() {
            _this.isFace = false;
          }, 1000);
        })
        .catch(error => {
          _this.$message({
            type: "danger",
            message: "认证失败,请重新认证"
          });
        });
    },
    submitForm(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.ruleForm.username === "18090906688" &&
            this.ruleForm.sms === "165998"
          ) {
            this.iframeState = true;
            cookie.setCookie("name", this.ruleForm.username, 7);
            cookie.setCookie("token","3h21h3kj12h3kjh12kj3hk", 7);
            this.$store.dispatch("setInfo");
            this.mediaStreamTrack.getTracks().forEach(function (track) {
                track.stop();
            });
            // this.$router.push("/live");
            return;
          } else {
            this.$message({
              type: "error", 
              message: "账户或密码错误"
            });
          }
          return 
          login({
            Phone: this.ruleForm.username,
            Password: this.ruleForm.password
          })
            .then(response => {
              cookie.setCookie("name", this.ruleForm.username, 7);
              cookie.setCookie("token", response.data.Token, 7);
              this.$store.dispatch("setInfo");
              this.$router.push("/live");
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
   showIframe(){
      this.submitForm('ruleForm');
    },
    test(){
      this.$emit('test');
    },
    shout(){
      console.log('我触发了它');
    },
    teleSms(){
      const TIME_COUNT = 30;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.smsNote = TIME_COUNT+"s后重新发送";
        this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--;
          this.smsNote = this.count+"s后重新发送";
          } else {
          this.smsNote = "获取验证码";
          clearInterval(this.timer);
          this.timer = null;
          }
        }, 1000)
      }
    }
  },
  created() {
    const self = this;
    let constraints = { audio: false, video: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {
        self.mediaStreamTrack = mediaStream;
        self.$refs.video.srcObject = mediaStream;
        self.$refs.video.onloadedmetadata = function(e) {
          self.$refs.video.play();
        };
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  line-height: 50px;
  color: #fff;
  background-color: #242f42;
}

.header .logo {
  float: left;
  width: 250px;
  text-align: center;
}
.word {
  float: left;
  width: 55%;
  text-align: center;
}
.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}

.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}

.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-menu__item {
  text-align: center;
}
.Login {
  width: 450px;
  margin-top: 20px;
}
el-form {
  margin: 0px auto;
}
.clearfix {
  text-align: center;
}
.main_bg{
   background-image: url(../../../static/images/bg.jpg);
    background-repeat:no repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  height: 100%;
}
</style>
