<template>
  <div class="login-div">
    <el-card class="Login">
      <div slot="header" class="clearfix">
        <h2>登陆</h2>
      </div>
      <el-form ref="ruleForm" :model="ruleForm" label-position="right" :rules="rules" >
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
  </div>
</template>

<script>
import cookie from "../../utils/cookie.js";
import { login } from '../../api/api';
export default {
  name: "login",
  data() {
    return {
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
  methods: {
    submitForm(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        cookie.setCookie("name", this.ruleForm.username, 7);
        cookie.setCookie("token", "dsadad", 7);
        this.$store.dispatch("setInfo");
        this.$router.push("/live");
        if (valid) {
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
    cookie.delCookie('token');
    cookie.delCookie('name');
    this.$store.dispatch('setInfo')
  }
};
</script>

<style>
.Login {
  width: 480px;
  margin: 150px auto;
}
el-form {
  margin: 0px auto;
}
.clearfix {
  text-align: center;
}
</style>
