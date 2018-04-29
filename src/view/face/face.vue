<template>
  <div>
    <div class="header">
      <div class="logo">智慧睡眠宝云平台</div>
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
        <el-card class="Login">
          <div slot="header" class="clearfix">
            <h2>登陆</h2>
          </div>
          <el-form ref="ruleForm" :model="ruleForm" label-position="right" :rules="rules">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="请输入账户">
                <template slot="prepend">账户</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" @keyup.enter.native="submitForm('ruleForm')">
                <template slot="prepend">密码</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox>记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%">登陆</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
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
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码为空", trigger: "blur" }]
      }
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
            message: "认证成功,1秒后跳转至账户登陆界面"
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
            this.ruleForm.username === "admin" &&
            this.ruleForm.password === "123456"
          ) {
            cookie.setCookie("name", this.ruleForm.username, 7);
            cookie.setCookie("token","3h21h3kj12h3kjh12kj3hk", 7);
            this.$store.dispatch("setInfo");
            this.$router.push("/live");
            return;
          } else {
            this.$message({
              type: "danger",
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
    }
  },
  created() {
    const self = this;
    let constraints = { audio: false, video: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {
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
  width: 480px;
  margin: 10px auto;
}
el-form {
  margin: 0px auto;
}
.clearfix {
  text-align: center;
}
</style>
