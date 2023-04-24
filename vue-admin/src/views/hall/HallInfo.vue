<template>
  <div>
    <!--面包屑导航区域-->
    <div class="board">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>场馆管理</el-breadcrumb-item>
        <el-breadcrumb-item>场馆信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--卡片视图-->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input v-model="inputHallName" placeholder="请输入场馆名称" clearable></el-input>
        </el-col>
        <el-col :span="1.5">
          <el-button icon="el-icon-search" @click="setHallList">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addDialogVisible = true">添加场馆</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" @click="multipleDelete">批量删除</el-button>
        </el-col>
      </el-row>

      <!--场馆分类列表-->
      <el-table :data="hallList" style="width: 100%" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="#" width="250"></el-table-column>
        <el-table-column prop="name" label="场馆名称"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="address" label="场馆地址" width="500"></el-table-column>
        <el-table-column prop="seatsNumber" label="总座位数"></el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改场馆信息" placement="top" :enterable="false" :open-delay="500">
              <el-button type="primary" icon="el-icon-edit" size="mini"
                         @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除场馆" placement="top" :enterable="false" :open-delay="500">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="deleteHallById(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--添加场馆对话框-->
    <el-dialog title="添加场馆" :visible.sync="addDialogVisible" width="60%" @close="addDialogClosed">
      <!--内容主题区-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <!--prop：在addFormRules中定义校验规则， v-model：双向绑定数据-->
        <el-form-item label="场馆名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="场馆地址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-select v-model="addForm.city" placeholder="请选择演出城市">
            <el-option
              v-for="item in citys"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="总座位数" prop="seatsNumber">
          <el-input-number v-model="addForm.seatsNumber" controls-position="right" :min="1" :max="500"></el-input-number>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addHall">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改场馆对话框-->
    <el-dialog title="修改场馆" :visible.sync="editDialogVisible" width="60%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <!--prop：在addFormRules中定义校验规则， v-model：双向绑定数据-->
        <el-form-item label="场馆编号" prop="id">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="场馆名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-select v-model="editForm.city" placeholder="请选择演出城市">
            <el-option
              v-for="item in citys"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="场馆地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="总座位数" prop="seatsNumber">
          <el-input-number v-model="editForm.seatsNumber" controls-position="right" :min="1" :max="500"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editHallInfo">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { createHall, getHallList, updateHall, deleteHall } from '@/api/hall'

export default {
  name: "HallInfo",
  data() {
    return {
      queryInfo: {
        hallName: '',
        hallCategory: '',
        pageNum: 1,
        pageSize: 7
      },
      hallList: [],
      cinemaInfo: {},
      total: 0,
      //控制对话框的显示与隐藏
      addDialogVisible: false,
      //添加场馆的表单数据
      addForm: {
        name: '',
        city: '',
        address: '',
        seatsNumber: 0
      },
      citys: ["深圳", "香港", "珠海", "湛江", "海口"],
      //验证表单规则对象
      addFormRules: {
        name: [
          { required: true, message: '请输入场馆名称', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入城市', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入场馆地址', trigger: 'blur' }
        ],
        seatsNumber: [
          { required: true, message: '请输入总座位数', trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        name: [
          { required: true, message: '请输入场馆名称', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入城市', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入场馆地址', trigger: 'blur' }
        ],
        seatsNumber: [
          { required: true, message: '请输入总座位数', trigger: 'blur' }
        ]
      },
      inputHallName: '',
      multipleSelection: []
    }
  },
  created() {
    this.setHallList()
  },
  methods: {
    async setHallList() {
      const search = {}
      if(this.inputHallName) search.name = this.inputHallName

      const { data } = await getHallList(search)
      this.hallList = data
    },
    async getHallCategoryList(){
      const _this = this
      await axios.get('sysCinema').then(resp => {
        _this.cinemaInfo = resp.data.data
      })
      _this.hallCategoryList = []
      for (const item of JSON.parse(this.cinemaInfo.hallCategoryList)) {
        this.hallCategoryList.push(item)
      }
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.setHallList()
      console.log(newSize)
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.setHallList()
      console.log(newPage)
    },
    // 监听添加对话框的关闭事件
    addDialogClosed(){
      this.$refs.addFormRef.resetFields()
    },
    // 监听添加按钮
    async addHall(){
      const res = await createHall(this.addForm)
      if(res.status !== 201) {
        this.$message.error('添加场馆失败！')
        return
      }
      this.addDialogVisible = false
      await this.setHallList()
      this.$message.success('添加场馆成功！')
    },
    // 显示修改对话框，回显数据
    showEditDialog(data){
      this.editForm = data
      this.editDialogVisible = true
    },
    // 监听修改对话框的关闭事件
    editDialogClosed(){
      this.$refs.editFormRef.resetFields()
    },
    // 修改场馆分类信息并提交
    async editHallInfo(){
      const res = await updateHall(this.editForm.id, this.editForm)
      if(res.status !== 200) {
        this.$message.error('修改场馆信息失败！')
        return
      }
      this.editDialogVisible = false
      await this.setHallList()
      this.$message.success('修改场馆信息成功！')
    },
    // 监听多选框变化
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    async multipleDelete(){
      //询问用户是否确认删除
      const res = await this.$confirm('此操作将永久删除这些条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 用户确认删除, res为字符串"confirm"
      // 用户取消删除，res为字符串"cancel"
      if (res === 'cancel'){
        return this.$message.info('已取消删除')
      }

      let ids = []
      this.multipleSelection.forEach(data => ids.push(data.id))
      const resp = await deleteHall(ids)
      if(resp.status !== 200) {
        this.$message.error('批量删除场馆失败！')
        return
      }
      this.setHallList()
      this.$message.success('批量删除场馆成功！')
    },
    //根据id删除对应的场馆分类
    async deleteHallById(id){
      //询问用户是否确认删除
      const res = await this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 用户确认删除, resp为字符串"confirm"
      // 用户取消删除，resp为字符串"cancel"
      if (res === 'cancel'){
        return this.$message.info('已取消删除')
      }

      const resp = await deleteHall([ id ])
      if(resp.status !== 200) {
        this.$message.error('批量删除场馆失败！')
        return
      }
      this.setHallList()
      this.$message.success('删除场馆信息成功！')
    },
    async arrangeSeat(id){
      const _this = this
      await axios.get('sysHall/' + id).then(resp => {
        _this.editSeat = resp.data.data
        _this.seats = JSON.parse(resp.data.data.seatState)
        console.log(resp)
      })
      console.log(this.seats)
      this.arrangeDialogWidth = 200 + this.editSeat.seatNumsRow * 40 + 'px'
      this.arrangeDialogVisible = true
    },
    pressSeat(key, idx){
      console.log( typeof this.seats[key][idx])
      this.$set(this.seats[key], idx, (this.seats[key][idx] === 0 ? 1 : 0))
    },
    async saveSeat(){
      this.editSeat.seatState = JSON.stringify(this.seats)
      console.log(this.editSeat)
      let totalSeats = 0
      for(let key in this.seats){
        for(let j = 0; j < this.seats[key].length; j++){
          if(this.seats[key][j] === 0){
            totalSeats++
          }
        }
      }

      this.$set(this.editSeat, 'seatNums', totalSeats)
      const _this = this
      axios.defaults.headers.put['Content-Type'] = 'application/json'
      await axios.put('sysHall', JSON.stringify(_this.editSeat)).then(resp => {
        if (resp.data.code !== 200){
          this.$message.error('安排座位失败！')
        }
      })
      this.arrangeDialogVisible = false
      this.setHallList()
      this.$message.success('安排座位成功！')
    }
  }
}
</script>

<style scoped>
  .row{
    white-space: nowrap;
    margin-top: 10px;
    padding: 0 10px;
    text-align: center;
    display: flex;
    justify-content: space-between;
  }
  .seat{
    display: inline-block;
    width: 30px;
    height: 26px;
    margin: 0 5px;
    background-position: 0 1px;
  }
  .seat-default {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAHKSURBVEhLxZfbysIwDMezKeJUVAR9A/H9X0FQZMOLeem14sWc4AnP9muybM4557eT/mCYdLT/tknaqQgJ/ACVf7/Oz4TfbvVisYDlcgm1Wg2SRON0OoGqqtDr9bglAAoHGY1GQgqzl5zz+SyGwyF7z7wITyYTtrJD13W2HrzEuFqtspUdnU4Hbrcbew5fSa5SqfQbYbmzoCgKew5fK6disciWgyd8vV5hPB5DoVAA27bpSct6vQbLsmjFhmFwK0MpJjFNky2H3W4nZEf24rPZbMTlcmFPiPv9LgaDAXu+rNY0jS0HzG5Zh+zFRwo9bS/GuNvtgpwM+SQsVwetVosa/GDnpMhFsfUAJ3I4HMgmYRQIZl1awsbzTyYyqzHRkhK2Yj+RwklwBYMHRpDMhd0tTrXiT52jwCsxCrqPZc3RARLM7O1266V/XMrlMlQqFfYcVqsVZXa9Xo8Wzhq/cOYx/i+e8KeYZIFfgyyMxWw2o4Y8mc/nXty9jz08NqfTKTSbTapBLAt8kh6buDocGh+3xNrtNjQaDbLxRSj7/f7pNolLv98Xx+ORvVfeBla+S3VJ4K7hGO/I7S8MDht2UbjklspRokj+NRQKwB/pWISi3oSUQQAAAABJRU5ErkJggg==") no-repeat;
  }
  .seat-choose{
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAKVSURBVEhLxZXPThpRFMY/hhFBG4okbdiYxgXpxmJi0phi4sKlL+HWlSsfwMSFr+DKjSufwMSFiyakaaagQaOxW1txUUjDHwVh5vacmdtxgGEsA1N/yYHLvdzzzT33nDMhQeAFUOT3f+fFhAeGutRs4tfpKV5dXECoqpz9R8hlKxqFsrqK96mUnOzGVfhrsYh3+/tIXV8Dk5Nydkh0HW3a+21zE59WVuTkE33C5/k8PmxvW4ITE/SPkFzxQacDUOS0nR18XFiQkxZ9dzx9dARwaCOR0UQZ9kP29vAQupz6S39y8UmVMeZcOIwInfp54QAQdJDe2LkLt9tAq2Vmp294L/vhe6Zxb13YwrSMvKZRZMIoLy2hvLYG3N/7E+c9FN7f2SzK8/MQiQS0szO5aGFndfHkBJndXSAeNzc2ZmehUw3GCwUru4eBTlpbXETs6grqwwNgGBBkX7a2kF1eNv9inziWy1minFxU/NM3N2jHYr5PbJAPtdGwHpp8hiiS6YMDUPBNTOE6WfL21sxAGx7Xav5KivaIx0fy7kghGqv0QHR+6yd/GGQUcx52M0Idu+0UDn+ORxovLp24i8CEO9SrvQhM+LlL8hQWnJHcBHxYiKvDA7OOqzTobGwgWalYjZ2hjlObm0N7Zmb4kqIkipZKmLq7e6oU8ldJJqHu7YGK1kOYke3OF1xKzvLsEfa+Y34IDrcfc4q6YAsrfDcBozgy3RSeIvuRyVidinsrNfixW7WKn+m0qcXYLwlum9+Pj5G4vITO709KEDaDmrsfFPLBrtnMrkhvqDfr63gt13nBlYZhiFyhIH8Nz2dNE005dmNgcgl6Fxv8dvGJXq9DcIgHYId63LBbvqpBeJfTCHiJMoEJewP8Afy6sw903o8jAAAAAElFTkSuQmCC") no-repeat;
  }

</style>
