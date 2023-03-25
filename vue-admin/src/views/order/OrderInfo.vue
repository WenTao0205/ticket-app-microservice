<template>
  <div>
    <!--面包屑导航区域-->
    <div class="board">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--卡片视图-->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input v-model="inputUserName" @clear="clearQuery" placeholder="请输入用户名" clearable></el-input>
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-search" @click="changeUsername">搜索</el-button>
        </el-col>
        <el-col :span="4">
          <el-select v-model="selectedHall" @change="changeHall" @clear="clearQuery" placeholder="请选择演出剧院" clearable>
            <el-option v-for="item in hallList" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="selectedShow" @change="changeShow" @clear="clearQuery" placeholder="请选择演出" clearable>
            <el-option v-for="item in showList" :key="item.id" :label="item.title" :value="item.title"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="selectedState" @change="changeStatus" @clear="clearQuery" placeholder="请选择订单状态" clearable>
            <el-option v-for="item in payStates" :key="item.id" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <!--订单列表-->
      <el-table :data="orderList" style="width: 100%" border stripe>
        <el-table-column prop="id" label="#" width="220"></el-table-column>
        <el-table-column prop="username" label="用户名" width="120"></el-table-column>
        <el-table-column prop="show.title" label="演出标题"></el-table-column>
        <el-table-column prop="show.hall.name" label="演出剧院"></el-table-column>
        <el-table-column prop="seat" label="座位号" width="150" :formatter="seatFormatter"></el-table-column>
        <el-table-column prop="price" label="价格" width="80" :formatter="priceFormatter"></el-table-column>
        <el-table-column prop="status" label="支付状态" width="100" :formatter="statusFormatter"></el-table-column>
        
        <el-table-column label="操作" width="60">
          <template slot-scope="scope">
            <span v-if="scope.row.status !== 'created'">暂无操作</span>
            <el-tooltip v-else effect="dark" content="撤销订单" placement="top" :enterable="false" :open-delay="500">
              <el-button type="warning" icon="el-icon-back" size="mini" @click="cancelOrderById(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
import { getOrderList, cancelOrder } from '@/api/orders'
import { getShowList } from '@/api/shows'
import { getHallList } from '@/api/hall'
import { getUserNameById } from '@/api/users'

export default {
  name: "billInfo",
  data() {
    return {
      inputUserName: '',
      selectedHall: '',
      selectedShow: '',
      selectedState: '',
      orderList: [],
      originOrderList: [],
      showList: [],
      hallList: [],
      payStates: [
        {
          id: 0,
          name: '未支付',
          value: 'created'
        },
        {
          id: 1,
          name: '已支付',
          value: 'complete'
        },
        {
          id: 2,
          name: '已取消',
          value: 'cancelled'
        }
      ]
    }
  },
  created() {
    this.setOrderList()
  },
  methods: {
    async setOrderList() {
      const { data: order } = await getOrderList()
      const { data: show } = await getShowList()
      const { data: hall } = await getHallList()
      for(let item of order) getUserNameById(item.userId).then(res => this.$set(item, "username", res.data.username))

      this.orderList = order
      this.originOrderList = order
      this.showList = show
      this.hallList = hall
      console.log(this.orderList, this.showList, this.hallList)
    },

    changeUsername() {
      this.selectedHall = ''
      this.selectedShow = ''
      this.selectedState = ''

      this.orderList = this.originOrderList.filter(item => item.username === this.inputUserName)
    },
    changeHall() {
      this.inputUserName = ''
      this.selectedShow = ''
      this.selectedState = ''

      this.orderList = this.originOrderList.filter(item => item.show.hall.name === this.selectedHall)
    },
    changeShow() {
      this.inputUserName = ''
      this.selectedHall = ''
      this.selectedState = ''

      this.orderList = this.originOrderList.filter(item => item.show.title === this.selectedShow)
    },
    changeStatus() {
      this.inputUserName = ''
      this.selectedShow = ''
      this.selectedHall = ''

      this.orderList = this.originOrderList.filter(item => item.status === this.selectedState)
    },
    clearQuery() {
      this.orderList = this.originOrderList
    },
    
    //根据id撤销对应的订单
    async cancelOrderById(id){
      //询问用户是否确认删除
      const res = await this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (res === 'cancel') return this.$message.info('已取消删除')

      const resp = await cancelOrder(id)
      if(resp.status !== 201) {
        this.$message.success('删除订单失败！')
        return
      }
      this.setOrderList()
      this.$message.success('删除订单成功！')
    },

    seatFormatter(row, col, value) {
      let seatValue = ''
      value.forEach(item => seatValue += `${item}号`)
      return seatValue
    },
    priceFormatter(row, col, value) {
      return `￥${value}`
    },
    statusFormatter(row, col, value) {
      if(value === 'created') return '待支付'
      if(value === 'complete') return '已支付'
      if(value === 'cancelled') return '已取消'
    }
  }
}
</script>

<style scoped>

</style>
