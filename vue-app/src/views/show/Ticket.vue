<template>
  <div>
    <el-page-header @back="goBack" content="电影购票">
    </el-page-header>
    <div style="width: 100%; height: 20px"></div>
    <div style="font-weight: bold;letter-spacing: 2px;font-size: 25px;color: red" v-if="list.length === 0">
      影院还没有添加排片
    </div>
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="item-des">
        <div class="d1">{{ film.name }}</div>
        <div class="d2">{{ item.date }} {{ item.startTime }}</div>
        <el-tag effect="plain">{{ item.type }}</el-tag>
      </div>
      <div class="item-btn">
        <el-button type="danger" @click="handleSelectSeat(item.id)" round>选座购票</el-button>
      </div>
      <div class="item-price">￥{{ item.price }}</div>
    </div>
  </div>
</template>

<script>
import { getCurrentUser } from '@/api/users'

export default {
  data() {
    return {
      currentUser: null,
      list: [
        {
          id: 1,
          date: '2022-10-11',
          startTime: '19:30',
          type: '爱情',
          price: 111
        }
      ],
      film: {
        name: '111'
      },
    }
  },
  created() {
    this.setCurrentUser()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async setCurrentUser() {
      this.currentUser = await getCurrentUser()
    },
    handleSelectSeat(id) {
      if (!this.currentUser) {
        this.$confirm('系统还没有检测到您的登陆信息, 是否去登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push("/login")
        })
      } else {
        this.$router.push("/seat?id=" + id)
      }
    },
  }
}
</script>

<style scoped>

.item {
  padding-top: 20px;
}

.d1 {
  font-size: 15px;
  letter-spacing: 2px;
  padding-bottom: 7px;
}

.d2 {
  font-size: 13px;
  letter-spacing: 1px;
  padding-bottom: 7px;
  color: #999;
}

.item {
  height: 100px;
}

.item-des {
  float: left;
}

.item-btn {
  float: right;
  padding-top: 30px;
  padding-left: 50px;
}

.item-price {
  float: right;
  color: #f34d41;
  line-height: 100px;
}
</style>