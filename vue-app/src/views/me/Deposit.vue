<template>
  <div class="deposit">
    <h3 style="letter-spacing: 1px;font-weight: 400;padding-bottom: 50px">余额充值</h3>
    <p style="margin-bottom: 30px;margin-left: 10px;">账户余额：{{ balance }}元</p>
    <el-button style="margin-left: 10px;" type="warning" @click="dialogVisible = true">去充值</el-button>

    <el-dialog title="余额充值" :visible.sync="dialogVisible">
      <span>自定义金额：</span><el-input style="width: 40%" v-model="depositAmount" type="number" clearable placeholder="请输入金额"></el-input>
      <br>
      <el-button @click="depositAmount = 200" plain style="margin-top: 30px;margin-left: 30px;margin-right: 30px;">200</el-button>
      <el-button @click="depositAmount = 500"  plain style="margin-right: 30px;">500</el-button>
      <el-button @click="depositAmount = 1000"  plain style="margin-right: 30px;">1000</el-button>
      <el-button @click="depositAmount = 3000"  plain style="margin-right: 30px;">3000</el-button>

      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="balanceDeposit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCurrentUser, deposit } from '@/api/users'
import { Message } from 'element-ui'

export default {
  name: "Deposit",
  data() {
    return {
      balance: 0,
      depositAmount: 0,
      dialogVisible: false
    }
  },
  created() {
    this.setUserBalance()
  },
  methods: {
    async setUserBalance() {
      const { balance } = await getCurrentUser()
      this.balance = balance
    },
    async balanceDeposit() {
      if(Number(this.depositAmount) <= 0) Message.error("充值金额必须大于0")
      else {
        const user = await getCurrentUser()
        const { data } = await deposit({ id: user.id, amount: this.depositAmount })
        this.balance = data.balance
        
        Message.success(`成功充值${this.depositAmount}元`)
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>