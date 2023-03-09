<template>
  <div>
    <!--面包屑导航区域-->
    <div class="board">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


    <!--卡片视图-->
    <el-card class="box-card">
      <el-row :gutter="20">

        <el-col :span="5">
          <el-input placeholder="请输入用户名" v-model="inputUserName" clearable />
        </el-col>
        <el-col :span="5">
          <el-input placeholder="请输入邮箱" v-model="inputEmail" clearable />
        </el-col>
        <el-col :span="5">
          <el-select v-model="selectedSex" placeholder="请选择性别" clearable>
            <el-option v-for="item in gender" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-search" @click="setUserList">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" @click="multipleDelete">批量删除</el-button>
        </el-col>
      </el-row>

      <el-table :data="userList" style="width: 80%" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="用户名" width="350px"></el-table-column>
        <el-table-column prop="email" label="电子邮箱"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100px" :formatter="sexFormatter"></el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改用户信息" placement="top" :enterable="false" :open-delay="500">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false" :open-delay="500">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUserById(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

    </el-card>

    <!--修改用户对话框-->
    <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="60%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="150px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="出生年月" prop="birthDate">
          <el-date-picker
                type="date" placeholder="选择日期"
                v-model="editForm.birthDate"
                value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="editForm.sex" placeholder="请选择性别" clearable >
            <el-option
                v-for="item in gender"
                :key="item.id"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUser, alterUserInfo, deleteUser } from '@/api/users'

export default {
  data() {
    let checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)){
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    return {
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur'}
        ],
        birthDate: [
          { trigger: 'change' }
        ],
        sex: [
          { message: '请选择性别', trigger: 'change' }
        ]
      },
      inputUserName: '',
      inputEmail: '',
      selectedSex: '',
      userList: [],
      gender: [
        {
          id: 1,
          name: '男'
        },
        {
          id: 0,
          name: '女'
        }
      ],
      multipleSelection: []
    }
  },
  created() {
    this.setUserList()
  },
  methods: {
    async setUserList() {
      const search = {}
      if(this.inputUserName) search.username = this.inputUserName
      if(this.inputEmail) search.email = this.inputEmail
      if(this.selectedSex) search.sex = this.selectedSex

      const { data } = await getAllUser(search)
      this.userList = data
    },
    // 显示修改对话框，回显数据
    async showEditDialog(data){
      this.editForm = data
      this.editDialogVisible = true
    },
    // 监听修改对话框的关闭事件
    editDialogClosed(){
      this.$refs.editFormRef.resetFields()
    },
    // 取消修改
    cancelEdit(){
      this.editDialogVisible = false
    },
    async editUserInfo(){
      const res = await alterUserInfo(this.editForm)
      if(res.status !== 200) {
        this.$message.error('修改用户信息失败！')
        return
      }
      this.editDialogVisible = false
      await this.setUserList()
      this.$message.success('修改用户信息成功！')
    },
    // 监听多选框变化
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async multipleDelete(){
      //询问用户是否确认删除
      const res = await this.$confirm('此操作将永久删除这些条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (res === 'cancel'){
        return this.$message.info('已取消删除')
      }

      let ids = []
      this.multipleSelection.forEach(data => {
        ids.push(data.id)
      })
      const resp = await deleteUser(ids)
      if(resp.status !== 200) {
        this.$message.success('删除用户失败！')
        return
      }
      this.setUserList()
      this.$message.success(`删除用户成功！删除个数：${ resp.data.deletedCount }`)
    },
    //根据id删除对应的用户
    async deleteUserById(id){
      //询问用户是否确认删除
      const res = await this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (res === 'cancel') return this.$message.info('已取消删除')

      const resp = await deleteUser([id])
      if(resp.status !== 200) {
        this.$message.success('删除用户失败！')
        return
      }
      this.setUserList()
      this.$message.success('删除用户成功！')
    },
    sexFormatter(row) {
      if(row.sex === '') return '暂未设置'
      return row.sex
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
</style>
