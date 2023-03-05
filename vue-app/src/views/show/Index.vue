<template>
  <div class="show">

    <div class="show-header">
    </div>

    <div class="show-card">
      <img alt="" style="width: 100%;height: 100%" :src="require('../../assets/img/showtest.jpg')">
    </div>

    <div class="show-des">
      <h1 class="showTitle" style="display: inline-block;margin-left: 20px;">{{ show.title }}</h1>
      <h3>时间：{{ show.startTime }}</h3>
      <h3>地点：{{ hall.address + hall.name }}</h3>
      <h3>票价：￥{{ show.price }}</h3>
      <el-button @click="toSeat" type="primary" class="buy-btn" plain>
        <i class="el-icon-s-ticket"></i> <span style="margin-left: 5px;">我要购票</span>
      </el-button>
    </div>

    <div class="show-content">
      <el-page-header @back="goBack" content="详情页面">
      </el-page-header>
      <div class="introTitle" style="font-weight: bolder;font-size: 25px;padding-top: 40px;padding-bottom: 40px;">演出介绍</div>
      <div style="line-height: 30px;text-indent:2.5em;padding-top: 20px;padding-bottom: 20px"> {{ show.intro }}
      </div>
    </div>

  </div>
</template>

<script>
import { getCurrentUser } from '@/api/users'
import { getShowDetail } from '@/api/shows'

export default {
  name: "Show",
  data() {
    return {
      currentUser: null,
      showId: this.$route.query.id,
      show: {},
      hall: {},
    }
  },
  created() {
    this.setCurrentUser()
    this.setShowDetail(this.showId)
  },
  methods: {
    async setCurrentUser() {
      this.currentUser = await getCurrentUser()
    },
    async setShowDetail(id) {
      const res = await getShowDetail(id)
      this.show = res.data
      this.hall = this.show.hall
      console.log(this.show)
    },
    toSeat() {
      if(!this.currentUser) {
        return this.$confirm('系统还没有检测到您的登陆信息, 是否去登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => this.$router.push({ name: 'Login' }))
      }
      this.$router.push({ name: 'Seat', query: { id: this.showId } })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>

.show-header {
  position: relative;
  width: 100%;
  height: 380px;
  background: #ed6133;
  margin-top: 12px;
}

.show-content {
  padding: 80px 200px;
  letter-spacing: 2px;
}

.showTitle:before {
  float: left;
  content: "";
  display: inline-block;
  width: 6px;
  height: 35px;
  margin-right: 0px;
  margin-left: -20px;
  background-color: #bdc3c7;
}

.p1 {
  font-weight: bolder;
  letter-spacing: 3px;
  color: #FFFFFF;
  font-size: 30px;
  padding-top: 20px;
  padding-bottom: 10px;
}

.p2 {
  font-size: 14px;
  padding-top: 20px;
  letter-spacing: 2px;
  color: #FFFFFF;
}

.show-card {
  width: 240px;
  height: 330px;
  background: #FFFFFF;
  margin-right: 100px;
  margin-left: 190px;
  position: absolute;
  overflow: hidden;
  top: 160px;
  z-index: 999;
}

.show-des {
  margin-left: 500px;
  position: absolute;
  overflow: hidden;
  top: 150px;
  z-index: 999;
  h1, h3 {
    color: #f1f2f6;
  }
}

.buy-btn {
  margin-top: 10px;
  width: 250px;
  height: 40px;
  font-size: 16px;
  text-align: center;
}

.introTitle:before {
  float: left;
  content: "";
  display: inline-block;
  width: 6px;
  height: 35px;
  margin-right: 20px;
  background-color: #ed6133;
}

.el-rate__icon {
  font-size: 25px;
}

.el-rate__text {
  padding-left: 8px;
  font-size: 30px;
}

</style>
