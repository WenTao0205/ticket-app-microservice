<template>
  <div class="header">
    <div class="header-box" style="height: 70px;width: 100%">
      <div class="header-logo">
        <img style="width: 50px; height: 50px;" src="../../assets/img/logo2.png" alt=""/>
        <div class="header-logo-text">得 票</div>
      </div>
      <div class="header-links">
        <el-link href="/" class="header-link" :underline="false">首页</el-link>
      </div>

      <el-link @click="toLogin" v-if="!currentUser"
               class="header-link"
               style="position: absolute;right: 400px"
               :underline="false">
        登录
      </el-link>

      <el-dropdown v-if="currentUser" class="dropdown">
        <el-button type="text">
          <div class="header-name">
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-link type="info" style="padding-right: 10px;letter-spacing: 2px;font-size: 16px;" :underline="false">{{ currentUser.username }}</el-link>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-link :underline="false" @click="toMyOrder" style="padding-right: 7px">
              <i style="font-size: 15px; padding-right: 3px" class="el-icon-s-order"></i>我的订单
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link :underline="false" @click="toMySetting" style="padding-right: 7px">
              <i style="font-size: 15px; padding-right: 3px" class="el-icon-user-solid"></i>个人设置
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-button type="text" @click="logout" :underline="false">
              <i style="font-size: 15px; padding-right: 3px" class="el-icon-switch-button"></i>退出登录
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
import { getCurrentUser, signOut } from '../../api/users'

export default {
  name: "Header",
  data() {
    return {
      currentUser: null
    }
  },
  created() {
    this.setCurrentUser()
  },
  methods: {
    async setCurrentUser() {
      this.currentUser = await getCurrentUser()
    },
    async logout() {
      await signOut()
      this.setCurrentUser()
    },
    toLogin() {
      this.$router.push({ name: 'Login' })
    },
    toMyOrder() {
      this.$router.push({ name: 'Order' })
    },
    toMySetting() {
      this.$router.push({ name: 'Setting' })
    },
  }
}
</script>

<style scoped>
.header {
  height: 70px;
  background: #FFFFFF;
  box-shadow: 0 2px 12px 0 rgb(0 0 0/10%);
  border: 1px solid #EBEEF5;
}

.header-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header-logo {
  display: flex;
  padding-left: 400px;
  align-items: center;
  letter-spacing: 2px;
}

.header-logo-text {
  padding-left: 20px;
  font-size: 30px;
  font-weight: bolder;
}

.header-search {
  width: 300px;
  border-radius: 20px;
}

.header-link {
  padding-left: 70px;
  letter-spacing: 2px;
  font-size: 17px;
}

.header-name {
  color: #000000;
  font-weight: bolder;
  font-size: 15px;
  letter-spacing: 2px;
}

::v-deep .el-input__inner {
  border-radius: 20px;
  height: 40px;
}

.dropdown {
  position: absolute;
  right: 400px;
}

::v-deep .el-button span {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 2px;
}
</style>

<style>

</style>