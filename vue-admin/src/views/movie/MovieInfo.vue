<template>
  <div>
    <!--面包屑导航区-->
    <div class="board">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>演出管理</el-breadcrumb-item>
        <el-breadcrumb-item>演出信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-card class="box-card">
      <el-row :addDialogVisible="20">
        <el-col :span="5">
          <el-input v-model="inputShowName" placeholder="请输入演出名称" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <el-select class="el-select-search" v-model="selectedShowHall" placeholder="请选择演出场馆" clearable>
            <el-option
                v-for="item in hallList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button class="el-button-search" icon="el-icon-search" @click="setShowList">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addDialogVisible = true">添加演出</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" @click="multipleDelete">批量删除</el-button>
        </el-col>
      </el-row>
    </el-card>

<!--    演出信息列表-->
    <el-table :data="showList" style="width: 100%" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="#" width="250"></el-table-column>
      <el-table-column prop="title" label="演出名称"></el-table-column>
      <el-table-column prop="hall.name" label="演出场馆" width="300"></el-table-column>
      <el-table-column prop="price" label="演出票价" width="120"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="180"></el-table-column>
      <el-table-column prop="endTime" label="预计结束时间" width="180"></el-table-column>
<!--      操作按钮-->
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="查看演出信息详细" placement="top" :enterable="false" :open-delay="500">
            <el-button type="success" icon="el-icon-view" size="mini" @click="toShowInfo(scope.row.showId)"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="修改演出信息" placement="top" :enterable="false" :open-delay="500">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="删除演出" placement="top" :enterable="false" :open-delay="500">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteShowById(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!--添加演出对话框-->
    <el-dialog title="添加演出" :visible.sync="addDialogVisible" top="5vh" width="60%" @close="addDialogClosed">
      <!--内容主题区-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <!--prop：在addFormRules中定义校验规则， v-model：双向绑定数据-->
        <el-form-item label="演出名称" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="演出票价" prop="price">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="演出场馆" prop="hall">
          <el-select v-model="addHallId" placeholder="请选择演出场馆">
            <el-option
              v-for="item in hallList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
              v-model="addForm.startTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计结束时间" prop="endTime">
          <el-date-picker
            v-model="addForm.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="演出封面" prop="cover">
          <el-upload
            action="#"
            list-type="picture-card"
            :limit="1"
            :show-file-list="true"
            :http-request="handleUpload"
            :before-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="演出简介" prop="intro">
          <el-input type="textarea" :rows="5" v-model="addForm.intro"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addShow">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 修改演出信息对话框 -->
    <el-dialog title="修改演出信息" :visible.sync="editDialogVisible" top="5vh" width="60%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="演出名称" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="演出票价" prop="price">
          <el-input v-model="editForm.price"></el-input>
        </el-form-item>
        <el-form-item label="演出场馆" prop="hall">
          <el-select v-model="editForm.hall.id" placeholder="请选择演出场馆">
            <el-option
              v-for="item in hallList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
              v-model="editForm.startTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计结束时间" prop="endTime">
          <el-date-picker
            v-model="editForm.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="演出封面" prop="cover">
          <el-image
            style="width: 148px;height: 148px;"
            :src="editForm.cover"
            :preview-src-list="[editForm.cover]"
          ></el-image>
        </el-form-item>
        <el-form-item label="演出简介" prop="intro">
          <el-input type="textarea" :rows="5" v-model="editForm.intro"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editShowInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getShowList, createShow, updateShow, deleteShow } from '@/api/shows'
import { getHallList } from '@/api/hall'
import { uploadPic, deletePic } from '@/plugins/cos.js'

export default {
  name: "ShowInfo",
  data() {
    return {
      queryInfo: {
        title: '',
        hallName: ''
      },
      total: 0,
      //控制对话框的显示与隐藏
      addDialogVisible: false,
      selectedShowCategory:[],
      selectedShowHall: '',
      selectedDate: [],
      inputShowName: '',
      categoryList:[],
      hallList: [],
      showList: [],
      editForm: {
        hall: {
          id: ''
        }
      },
      checkAbleId: {},
      editCategoryForm:[],
      showId:'',
      editDialogVisible: false,
      editCategoryVisible: false,
      multipleSelection: [],
      dialogVisible: false,
      dialogImageUrl: '',
      disabled:false,
      addHallId: '',
      //添加演出表单数据
      addForm: {},
      //添加验证表单规则对象
      addFormRules: {
        title: [
          { required: true, message: '请输入演出名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请选择演出票价', trigger: 'blur' }
        ],
        hall: [
          { required: true, message: '请选择演出场馆', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择演出开始时间', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择演出结束时间', trigger: 'blur' }
        ]
      },
      //修改验证表单规则对象
      editFormRules: {
        showName: [
          {required: true, message: '请输入演出名称', trigger: 'blur'}
        ],
        showArea: [
          {required: true, message: '请选择演出区域', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.setShowList()
  },
  methods: {
    async setShowList() {
      const showSearch = {}
      const hallSearch = {}
      if(this.inputShowName) showSearch.title = this.inputShowName
      if(this.selectedShowHall) hallSearch.name = this.selectedShowHall

      const { data: show } = await getShowList(showSearch)
      const { data: hall } = await getHallList(hallSearch)
      this.showList = show
      this.hallList = hall
    },
    // 监听添加对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 监听添加按钮
    async addShow() {
      console.log(this.addForm)
      console.log(this.addHallId)
      const res = await createShow(this.addHallId, this.addForm)
      if(res.status !== 201) {
        this.$message.error('添加演出失败！')
        return
      }
      //隐藏添加对话框
      this.addDialogVisible = false
      //重新加载列表
      this.setShowList()
      this.$message.success('添加演出信息成功！')
    },
    // 监听修改对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    //监听修改类别对话框的关闭事件
    editCategoryDialogClosed(){
      this.selectedShowCategory = ''
    },
    // 修改演出信息对话框
    async editShowInfo() {
      this.editForm.hallId = this.editForm.hall.id
      const res = await updateShow(this.editForm)
      if(res.status !== 200) {
        this.$message.error('添加演出失败！')
        return
      }
      this.editDialogVisible = false
      this.setShowList()
      this.$message.success('修改演出信息成功！')
    },
    handleUpload(res) {
      uploadPic(res.file, res.file.name).then(r => {
        console.log(r)
        this.addForm.cover = `https://${r.Location}`
        console.log(this.addForm)
      })
    },
    handleRemove(file) {
      console.log(file)
      deletePic(file.name).then(r => {
        this.addForm.cover = ''
        console.log(this.addForm)
      })
    },
    toShowInfo(id) {
      window.open('http://localhost:8081/showInfo/' + id)
    },
    // 显示修改对话框，回显数据
    async showEditDialog(data) {
      this.editForm = data
      this.editDialogVisible = true
    },
    // 监听多选框变化
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量删除前校验
    // 批量删除演出
    async multipleDelete() {
      //询问用户是否确认删除
      const res = await this.$confirm('此操作将永久删除这些条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 用户确认删除, resp为字符串"confirm"
      // 用户取消删除，resp为字符串"cancel"
      if (res === 'cancel') {
        return this.$message.info('已取消删除')
      }

      let ids = []
      this.multipleSelection.forEach(data => ids.push(data.id))

      const resp = await deleteShow(ids)
      if(resp.status !== 200) {
        this.$message.error('批量删除演出失败！')
        return
      }
      this.setShowList()
      this.$message.success('批量删除演出成功！')
    },
    // 单个删除演出
    async deleteShowById(id) {
      let deleteInfo = id
      //询问用户是否确认删除
      const res = await this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 用户确认删除, resp为字符串"confirm"
      // 用户取消删除，resp为字符串"cancel"
      if (res === 'cancel') {
        return this.$message.info('已取消删除')
      }

      const resp = await deleteShow([ id ])
      if(resp.status !== 200) {
        this.$message.error('批量删除演出失败！')
        return
      }
      this.setShowList()
      this.$message.success('删除演出信息成功！')
    }
  }
}
</script>

<style scoped>
.row2{
  margin-top: 20px;
}
.el-tag{
    margin: 0 10px 10px 0;
}
.el-button-search{
  margin: 0px 0px 0px 10px;
}
.el-select-search{
  margin: 0 0px 0px 20px;
}

::v-deep .el-form-item .cover {
  width: 145px;
  height: 145px;
}
</style>
