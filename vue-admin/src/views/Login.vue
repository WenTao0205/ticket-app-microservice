<template>
  <div class="login_container">
    <div class="login_box">
      <div class="title_box">
        <p>影院管理登录</p>
      </div>
      <!-- 登录表单区域 -->
      <el-form class="login_form" :model="loginForm" ref="loginFormRef">
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable
                    prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password
                    prefix-icon="iconfont icon-lock"></el-input>
        </el-form-item>
        <!-- 按扭区域 -->
        <el-form-item class="btns">
          <el-button size="medium" :round="true" type="primary" @click="login">点击登录</el-button>
          <el-button size="medium" :round="true" type="info" @click="resetLoginForm">恢复默认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { signIn } from '@/api/admin'

export default {
  name: "Login",
  data() {
    return {
      //登录表单数据对象
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods:{
    success(params) {
      console.log(params);
      this.login()
    },
    //点击重置按钮，重置表单
    resetLoginForm(){
      console.log(this.$refs)
      this.$refs.loginFormRef.resetFields();
    },
    async login() {
      await signIn(this.loginForm)
      this.$router.push({ name: 'Welcome' });
    }
  }
}
</script>

<style scoped>
.login_container{
  background-image: url("../assets/login-background.jpg");
  height: 100%;
}

.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box{
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.avatar_box > img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.title_box{
  text-align: center;
  font-size: 200%;
}

.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns{
  display: flex;
  justify-content: center;
}
</style>
