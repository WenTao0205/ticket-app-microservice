<template>
  <div style="width: 100%">
    <h3 style="letter-spacing: 1px;font-weight: 400;padding-bottom: 20px">我的订单</h3>
    <div>
      <el-card v-for="(item) in orderList" :key="item.id" class="box-card">
        <div>
          <img class="item-film-img" alt="" :src="item.show.cover"/>
          <div style="float: left;">
            <div class="item-film-name">《{{ item.show.title }}》</div>
            <div class="item-film-seat">订购座位 : {{ item.seat }}</div>
            <div class="item-film-time">演出时间 : {{ item.show.startTime }}</div>
          </div>
          <el-button type="text"
                     @click="toOrderDetail(item.id)"
                     v-if="item.status === 'created'"
                     style="line-height: 75px"
                     class="o1">
            等待支付
          </el-button>
          <div v-if="item.status === 'cancelled'" @click="toOrderDetail(item.id)" style="color: #E6A23C" class="o1">订单取消</div>
          <div v-if="item.status === 'complete'" @click="toOrderDetail(item.id)" style="color: #67C23A" class="o1">支付成功</div>
          <div class="o2">￥{{ item.price }}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/api/orders'

export default {
  name: "Order",
  data() {
    return {
      orderList: [],
      seats: ''
    }
  },
  created() {
    this.setOrderList()
  },
  methods: {
    async setOrderList() {
      const { data } = await getOrderList()
      this.orderList = data
      console.log(this.orderList)
    },
    toOrderDetail(id) {
      this.$router.push({ name: 'Pay', query: { id } })
    }
  }
}
</script>

<style scoped>

.box-card {
  margin-bottom: 10px;
}

::v-deep .el-card__header {
  background: #C0C4CC;
}

.item-film-img {
  float: left;
  width: 80px;
  height: 100px;
  padding-bottom: 10px;
  padding-right: 10px;
}

.item-film-name {
  letter-spacing: 2px;
  font-weight: 500;
  font-size: 18px;
  padding-bottom: 15px;
  padding-top: 1px;
}

.c-img {
  width: 100%;
  height: 100%;
}

.item-film-seat {
  letter-spacing: 1px;
  font-size: 12px;
  padding-bottom: 5px;
  padding-left: 10px;
  color: #91949c;
}


.item-film-time {
  letter-spacing: 1px;
  font-size: 12px;
  padding-left: 10px;
  padding-bottom: 5px;
  color: #91949c;
}

.o1 {
  float: right;
  line-height: 100px;
  padding-right: 20px;
  cursor: pointer;
}

.o2 {
  font-size: 20px;
  float: right;
  line-height: 100px;
  padding-right: 100px
}
</style>