<template>
  <div class="seat-main">
    <el-steps style="padding-bottom: 50px" :active="2" align-center>
      <el-step title="步骤1" description="选择座位号"></el-step>
      <el-step title="步骤2" description="结算付款"></el-step>
    </el-steps>
    <!-- 订单状态 -->
    <!-- 未支付，未取消，15分钟内 -->
    <div class="bill-info-status" v-if="order.status === 'created'">
      <div class="pay-icon">
        <img src="../assets/img/money.png">
      </div>
      <div class="pay-info">
        <div class="pay-info-status">待支付</div>
        <div class="pay-info-desc">请在<span>{{ minutes }} 分钟 {{ seconds }} 秒</span>内完成支付</div>
      </div>
    </div>
    <div class="bill-info-status finish" v-if="order.status === 'complete'">
      <div class="pay-icon">
        <img src="../assets/img/finish.png">
      </div>
      <div class="pay-info">
        <div class="pay-info-status finish">已完成</div>
      </div>
    </div>
    <div class="bill-info-status invalid" v-if="order.status === 'cancelled'">
      <div class="pay-icon">
        <img src="../assets/img/bill-invalid.png">
      </div>
      <div class="pay-info">
        <div class="pay-info-status invalid">订单已取消</div>
      </div>
    </div>
    <div class="seat-content">
      <div class="seat-aside">
        <div style="display: flex">
          <img style="padding: 30px" :src="require('../assets/img/showtest.jpg')" alt=""/>
          <div>
            <div
                style="
                padding-top: 40px;
                padding-bottom: 10px;
                font-size: 25px;
                letter-spacing: 2px;
              "
            >
              {{ show.title }}
            </div>
            <div class="seat-aside-text">类型：演唱会</div>
            <div class="seat-aside-text">城市：深圳</div>
            <div class="seat-aside-text">预计时长：120分钟</div>
          </div>
        </div>
        <div style="position: relative;padding: 5px 30px">
          <div class="d1"><span>地点：</span>{{ hall.name }}</div>
          <div class="d1" style="color: #f56c6c">
            <span>开场：</span>{{ show.startTime }}
          </div>
          <div class="d1"><span>散场：</span>{{ show.endTime }}</div>
          <div class="d1"><span>票价：</span>¥{{ show.price }}/张</div>
          <el-divider></el-divider>
          <div class="d1">
            已选座位：
            <el-tag v-for="(item, i) in order.seat" :key="i"
                    type="danger"
                    style="margin-right: 5px"
                    effect="plain">
              {{ item }} 号
            </el-tag>
          </div>
          <div class="d1" style="padding-top: 10px">
            总计：
            <span style="color: #f56c6c">¥ </span>
            <span style="color: #f56c6c; font-size: 25px; font-weight: bold"
            >{{ order.price }}</span
            >
          </div>
          <div class="submit-bill" v-if="order.status === 'created'">
            <div>
              <el-button @click="payForOrder(order.id)" type="primary" style="width: 200px; margin-top: 20px;" round>立即支付</el-button></div>
            <div>
              <el-button @click="cancelForOrder(order.id)" type="danger" style="width: 200px; margin-top: 20px;" round>取消订单</el-button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { cancelOrder, completeOrder, getOrderDetail } from '@/api/orders'
import { getCurrentUser, buy } from '@/api/users'

export default {
  name: 'Pay',
  data() {
    return {
      show: {},
      order: {},
      hall: {},
      minutes: 0,
      seconds: 0
    }
  },
  async created() {
    await this.setOrderDetail(this.$route.query.id)
    this.setTimer()
  },
  methods: {
    async setOrderDetail() {
      const { data } = await getOrderDetail(this.$route.query.id)
      this.order = data
      this.show = this.order.show
      this.hall = this.show.hall
    },
    async cancelForOrder(id) {
      const { data } = await cancelOrder(id)
      this.order = data
      this.show = this.order.show
    },
    async payForOrder(id) {
      const { id: userid, balance } = await getCurrentUser()

      if(balance >= this.order.price) {
        await buy({ id: userid, amount: this.order.price })
        const { data } = await completeOrder(id)
        this.order = data
        this.show = this.order.show
        console.log(this.order)
        Message.success('支付成功，订单已完成')
      } else Message.error('余额不足请充值')
    },
    setTimer() {
      if(this.order.status === 'created') {
        let timer = null
        let _this = this
        timer = setInterval(() => {
          let timeleft = new Date(_this.order.expiresAt) - new Date()
          _this.convertTime(timeleft)
        }, 1000)
        this.$once('hook:beforeDestory', () => {
          clearInterval(timer)
          timer = null
        })
      }
    },
    async convertTime(timeleft) {
      if(timeleft <= 0) await this.setOrderDetail()
      this.minutes = parseInt((timeleft % (1000 * 60 * 60)) / (1000 * 60))
      this.seconds = ((timeleft % (1000 * 60)) / 1000).toFixed(0)
    }
  }
};
</script>

<style scoped>
@import "../assets/css/seat.css";

.seat-main {
  padding: 80px;
}

.seat-content {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  width: 70%;
  margin: 0 auto;
  height: 600px;
}

.seat-aside {
  width: 100%;
  height: 100%;
  float: left;
  background: #f5f6f7;
}

.seat-aside img {
  width: 140px;
  height: 200px;
}

.seat-select {
  padding-top: 50px;
  padding-left: 8%;
}

.seat-aside-text {
  padding-top: 8px;
  font-size: 13px;
  letter-spacing: 1px;
  color: #666666;
}

.d1 {
  font-size: 16px;
  letter-spacing: 2px;
  padding-bottom: 15px;
}

.d1 span {
  color: #91949c;
}

.add-cart-btn {
  letter-spacing: 2px;
  font-size: 16px;
  width: 100%;
  height: 60px;
  border-radius: 50px;
}

.item {
  padding-bottom: 20px;
}

.row-id {
  padding-bottom: 11px;
}

::v-deep .el-input__inner {
  border-radius: 50px;
  height: 55px;
}

.bill-info-status{
  margin: 0 auto;
  width: 70%;
  height: 120px;
  background: #FFFBF2;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.pay-icon{
  width: 40px;
  height:40px;
  margin-left: 50px;
}

.pay-icon>img{
  width: 100%;
  height: 100%;
}

.pay-info{
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.pay-info-status{
  color: #FAAF00;
  font-size: 24px;
  font-weight: 700;
}

.pay-info-desc{
  color: #999;
  font-size: 13px;
}

.pay-info-desc>span{
  font-size: 16px;
  color: #faaf00;
  margin: 5px 5px;
}

.bill-info-status.finish{
  background: #F4FFF8;
}

.bill-info-status.invalid{
  background: #FFE0E0;
}

.pay-info-status.finish{
  color: #26CE61;
}

.pay-info-status.invalid{
  color: #faaaaa;
}

.submit-bill {
  display: flex;
  flex-direction: row-reverse;
  gap: 40px;
  position: absolute;
  right: 50px;
  bottom: 10px;
}
</style>