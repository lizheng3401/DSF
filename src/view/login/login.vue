<template>
  <div class="login-div">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="登录"></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import cookie from "../../utils/cookie.js";
export default {
  name: "login",
  data() {
    return {
      form: {}
    };
  },
  methods: {},
  created() {}
};
</script>

<style>
.login-div {
  background-color: #242f42;
}
</style>
