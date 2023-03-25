<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form-header">
        <img style="width: 75px; height: 75px;float: left;padding-right: 40px;" src="../assets/img/logo2.png"
             alt=""/>
        <div class="login-form-text">得票 - 注册</div>
      </div>
      <div style="color: #91949c;font-weight: bolder">
        <p>用户名</p>
        <el-input class="login-form-input" v-model="username" placeholder="用户名"></el-input>
        <p>邮 箱</p>
        <el-input class="login-form-input" v-model="email" placeholder="邮 箱"></el-input>
        <p>密 码</p>
        <el-input class="login-form-input" placeholder="密 码" v-model="password" show-password></el-input>
        <el-button @click="register" class="login-form-button" type="primary">注册</el-button>
      </div>
      <div class="login-form-footer">
        <el-link @click="toLogin" style="font-weight: bolder;font-size: 16px;color: #91949c;"
                 :underline="false">
          我有账号 去登录
          <i style="font-weight: bolder;font-size: 15px" class="el-icon-right"></i>
        </el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { signUp } from '../api/users'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      await signUp(data)
      this.$router.push({ name: 'Home' })
    },
    toLogin() {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>

.login {
  width: 100%;
  height: 100%;
  background: #FFFFFF;
}

.login-form {
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  letter-spacing: 2px;
}

.login-form-header {
  height: 20px;
  padding-left: 90px;
  padding-bottom: 100px;
}

.login-form-text {
  color: #000000;
  font-weight: bold;
  font-size: 30px;
  padding-top: 15px;
}

.login-form-input {
  margin-bottom: 10px;
}

.login-form-button {
  text-align: center;
  border-radius: 3px;
  width: 100%;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 2px;
  height: 60px;
  background: #5a84fd;
  box-shadow: 0 5px 30px rgb(0 66 8.5%);
  margin-top: 35px;
}

.login-form-footer {
  font-weight: bolder;
  color: #91949c;
  padding-top: 40px;
  text-align: center;
}

.el-input__inner {
  height: 48px;
}

.el-checkbox {
  color: #91949c;
  font-weight: bolder;
  font-size: 15px;
}

</style>
