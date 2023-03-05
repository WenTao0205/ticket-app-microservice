<template>
  <div class="seat-main">
    <el-steps style="padding-bottom: 50px" :active="2" align-center>
      <el-step title="步骤1" description="选择座位号"></el-step>
      <el-step title="步骤2" description="结算付款"></el-step>
    </el-steps>
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
        <div style="padding: 5px 30px">
          <div class="d1"><span>地点：</span>{{ hall.name }}</div>
          <div class="d1" style="color: #f56c6c">
            <span>开场：</span>{{ show.startTime }}
          </div>
          <div class="d1"><span>散场：</span>{{ show.endTime }}</div>
          <div class="d1"><span>票价：</span>¥{{ show.price }}/张</div>
          <el-divider></el-divider>
          <div class="d1">
            已选座位：
            <el-tag v-for="(item, i) in userSelectSeats" :key="i"
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
          <el-divider></el-divider>
          <div style="padding: 0 50px;margin-top: 80px;">
            <el-button @click="submitSeat" class="add-cart-btn" type="danger" round
            >去结账
            </el-button>
          </div>
        </div>
      </div>

      <div class="hall seat-select">
        <div style="padding-left: 30px" class="seat-example">
          <div class="selectable-example example">
            <span>可选座位</span>
          </div>
          <div class="sold-example example">
            <span>已售座位</span>
          </div>
          <div class="selected-example example">
            <span>已选座位</span>
          </div>
        </div>

        <div class="seats-block">
          <div class="seats-container">
            <div class="screen-container" style="left: 5px">
              <div class="screen">舞台中央</div>
              <div class="c-screen-line"></div>
            </div>

            <div class="seats-wrapper">
              <div style="padding: 0 40px;width: 500px">
                <span v-for="(item, index) in seats" :key="index">
                  <!--不可选-->
                  <span v-if="item.status === 0" class="seat sold item"/>
                  <!--可选-->
                  <span v-if="item.status === 1" @click="handleSelect(index)" class="seat selectable item"/>
                  <!--已选-->
                  <span v-if="item.status === 2" @click="handleDisSelect(index)" class="seat selected item"/>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShowDetail } from '@/api/shows'
import { createOrder } from '@/api/orders'

export default {
  data() {
    return {
      order: {
        showId: this.$route.query.id,
        seats: '',
        price: 0
      },
      show: {},
      hall: {},
      seats: [],
      userSelectSeats: [],
      timer: null
    }
  },
  created() {
    this.renderInitialData()
  },
  methods: {
    async setShowDetail(id) {
      const res = await getShowDetail(id)
      this.show = res.data
      this.hall = this.show.hall
      console.log(this.show)
      console.log(this.hall)
    },
    //0 已选
    //1 可选
    //2 已选中
    loadSeats() {
      const n = this.hall.seatsNumber
      let arr = new Array(n)
      for (let i = 0; i < n; i++) {
        if (this.show.selectedSeat.indexOf(i + 1) === -1) {
          arr[i] = {seat: i + 1, status: 1}
        } else {
          arr[i] = {seat: i + 1, status: 0}
        }
      }
      this.seats = arr
    },
    renderInitialData() {
      let timerId = setInterval(async () => {
        await this.setShowDetail(this.$route.query.id)
        this.loadSeats()
      }, 1000)
      this.$once('hook:beforeDestory', () => {
        clearInterval(timerId)
      })
    },
    handleSelect(index) {
      if (this.userSelectSeats.length >= 4) {
        let d = this.userSelectSeats[0] - 1
        this.seats[d].status = 1
        this.userSelectSeats.splice(0, 1)
      }
      this.userSelectSeats.push(index + 1)
      this.seats[index].status = 2
      this.order.price = (this.show.price) * (this.userSelectSeats.length)
    },
    handleDisSelect(index) {
      this.seats[index].status = 1
      this.userSelectSeats.splice(this.userSelectSeats.indexOf(index + 1), 1)
      this.order.price = (this.show.price) * (this.userSelectSeats.length)
    },
    checkSeats() {
      if (this.userSelectSeats.length === 0) {
        this.$message({
          message: '请选择要订购的座位',
          type: 'warning'
        });
        return false;
      }
      return true;
    },
    submitSeat() {
      if (this.checkSeats()) {
        this.order.seats = this.userSelectSeats
      } else return
    }
  },
};
</script>

<style scoped>
@import "../assets/css/seat.css";

.seat-main {
  padding: 80px;
}

.seat-content {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  height: 850px;
}

.seat-aside {
  width: 30%;
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
</style>