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
        <el-form-item label="演出简介" prop="intro">
          <el-input type="textarea" :rows="5" v-model="addForm.intro"></el-input>
        </el-form-item>
        <!-- <el-form-item label="演出封面">
          <el-upload action="" list-type="picture-card"
                     :auto-upload="false" :limit="1"
                     :file-list="poster" :on-exceed="handleExceed"
                     :on-change="handleChangeP"
                     :on-success="handleSuccessP"
                     :on-error="handleError" ref="posterRef"
                     :http-request="submitFileP">
            <i slot="default" class="el-icon-plus" ></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreviewP(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemoveP(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          放大预览
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item> -->
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
        <el-form-item label="演出简介" prop="intro">
          <el-input type="textarea" :rows="5" v-model="editForm.intro"></el-input>
        </el-form-item>
<!--        修改封面-->
        <el-form-item label="演出封面">
          <el-upload action="" list-type="picture-card"
                     :auto-upload="false" :limit="1"
                     :file-list="poster" :on-exceed="handleExceed"
                     :on-change="handleChangeP"
                     :on-success="handleSuccessP"
                     :on-error="handleError" ref="posterEditRef"
                     :http-request="submitFileP">
            <i slot="default" class="el-icon-plus" ></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreviewP(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemoveP(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <!--放大预览-->
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editShowInfo">确 定</el-button>
      </span>
    </el-dialog>

<!--    演出类型管理界面-->
    <el-dialog title="演出类型管理" :visible.sync="editCategoryVisible" width="60%" @close="editCategoryDialogClosed">
<!--      <template>-->
<!--        <el-checkbox-group-->
<!--            v-model="selectedShowCategory">-->
<!--          <el-checkbox v-for="category in showCategoryList" :label="category.showCategoryName" :key="category.showCategoryId">{{category.showCategoryName}}</el-checkbox>-->
<!--        </el-checkbox-group>-->
<!--      </template>-->
      <!-- <el-form label-width="100px">
        <el-form-item label="演出类型" prop="showActor">
          <el-select v-model="selectedShowCategory" placeholder="请选择类型名称" clearable>
            <el-option
                v-for="item in categoryList"
                :key="item.showCategoryId"
                :label="item.showCategoryName"
                :value="item.showCategoryId"
                v-if="ifShow(item.showCategoryId)">
            </el-option>
          </el-select>
        <el-button type="primary" @click="addCategory()">添加</el-button>
        </el-form-item>
        <el-form-item>
              <el-tag
                  v-for="tag in editCategoryForm"
                  :key="tag.showCategoryName"
                  closable
                  @close="deleteCategory(tag.showCategoryId)">
                {{tag.showCategoryName}}
              </el-tag>
        </el-form-item>
      </el-form> -->
    </el-dialog>
  </div>
</template>

<script>
import { getShowList, createShow, updateShow, deleteShow } from '@/api/shows'
import { getHallList } from '@/api/hall'

export default {
  name: "ShowInfo",
  data() {
    return {
      queryInfo: {
        showId: '',
        showArea: '',
        showName: '',
        startDate: '',
        endDate: '',
        pageNum: 1,
        pageSize: 7
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
      showAreaList: ["中国大陆", "美国", "韩国", "日本", "中国香港", "中国台湾", "泰国", "印度",
        "法国", "英国", "俄罗斯", "意大利", "西班牙", "德国", "波兰", "澳大利亚", "伊朗", "其他"],
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
      //演出封面增删变量
      poster: [],
      //发送给后端的JSON图片
      posterL: [],
      deletePostList:[],
      //添加删除图片集 动态绑定图片列表
      pics: [],
      // 发送给后端的JSON图片数组
      pictureList: [],
      picNums:0,
      deletePicList:[],
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
      const { data: show } = await getShowList()
      const { data: hall } = await getHallList()
      this.showList = show
      this.hallList = hall
    },
    getCategoryList() {
      const _this = this
      axios.get('sysShowCategory/find').then(resp=>{
        _this.categoryList = resp.data.data;
        console.log(_this.categoryList)
      })
    },
    ifShow(id) {
      let l = true
      for (let i = 0; i < this.editCategoryForm.length; i++) {
        if (id === this.editCategoryForm[i].showCategoryId) {
          l =false
        }
      }
      return l
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.setShowList()
      console.log(newSize)
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.setShowList()
      console.log(newPage)
    },
    async submitFile() {
      const _this = this
      for (let i = 0; i < this.pics.length; i++) {
        let formData = new FormData()
        if (this.pics[i].status === 'success') {
          let s = this.pics[i].url
          this.pictureList.push(s.substring(s.indexOf('/images')))
          continue
        }
        let file = this.pics[i].raw
        formData.append('file', file)
        await axios.post('upload/show', formData).then(response => {
          _this.pictureList.push(response.data.data)
        })
      }
    },
    async submitFileP() {
      const _this = this
      for (let i = 0; i < this.poster.length; i++) {
        let formData = new FormData()
        if (this.poster[i].status === 'success') {
          let s = this.poster[i].url
          this.posterL.push(s.substring(s.indexOf('/images')))
          continue
        }
        let file = this.poster[i].raw
        formData.append('file', file)
        await axios.post('upload/show', formData).then(response => {
          _this.posterL.push(response.data.data)
        })
      }
    },
    // 监听添加对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
      // this.$refs.pictureRef.clearFiles()
      // this.$refs.posterRef.clearFiles()
      // this.poster = []
      // this.posterL=[]
      // this.pics = []
      // this.pictureList = []
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
      // this.$refs.pictureEditRef.clearFiles()
      // this.$refs.posterEditRef.clearFiles()
      // this.pics = []
      // this.pictureList = []
      // this.posterL = []
      // this.poster = []
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
    handleChange(file, filelist) {
      this.pics = filelist.slice(0)
      console.log(this.pics)
    },
    handleChangeP(file, filelist) {
      this.poster = filelist
      console.log(this.poster)
    },
    handleSuccess(response) {
      this.pictureList.push(response.data)
      this.addForm = JSON.stringify(this.pictureList)
      this.editForm = JSON.stringify(this.pictureList)
    },
    handleSuccessP(response) {
      this.posterL.push(response.data)
      this.addForm = JSON.stringify(this.posterL)
      this.editForm = JSON.stringify(this.posterL)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureCardPreviewP(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file,filelist) {
      const filePath = file.url
      console.log(filePath)
      const idx = this.pics.findIndex(x => x.url === filePath)
      if(file.status === 'success'){
        this.deletePicList.push(file.url)
      }
      this.pics.splice(idx, 1)
    },
    handleRemoveP(file) {
      const filePath = file.url
      console.log(filePath)
      const idx = this.poster.findIndex(x=> x.url === filePath)
      if(file.status === 'success'){
        this.deletePostList.push(file.url)
      }
      this.poster.splice(idx,1)
    },
    handleError(err) {
      console.log(err)
    },
    toShowInfo(id) {
      window.open('http://localhost:8081/showInfo/' + id)
    },
    // 显示修改对话框，回显数据
    async showEditDialog(data) {
      this.editForm = data
      this.editDialogVisible = true
    },
    //显示修改类别对话框,回显数据
    async showEditCategoryDialog(id){
      const _this = this
      _this.showId = id
      await axios.get('sysShow/find/'+id).then(response=>{
        _this.editCategoryForm = response.data.data.showCategoryList
        })
      this.editCategoryVisible = true
    },
    //取消修改
    cancelEdit(){
      this.editDialogVisible = false
      this.deletePicList.splice(0,this.deletePicList.length)
      this.deletePostList.splice(0,this.deletePostList.length)
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
    },
    async deleteCategory(categoryId){
      console.log('类型id')
      console.log(categoryId)
      const _this = this
      await axios.delete('sysShowToCategory/'+this.showId+'/'+categoryId).then(resp=>{
        console.log(resp)
        _this.$message.success('删除类型成功')
      })
      await axios.get('sysShow/find/'+this.showId).then(response=>{
        _this.editCategoryForm = response.data.data.showCategoryList
      })
    },
    handleExceed(){
      this.$message.error('演出封面不能超过一张!')
    },
    async addCategory(){
      const _this = this
      await axios.post('sysShowToCategory/'+this.showId+'/'+this.selectedShowCategory).then(resp=>{
        console.log(resp)
        if (resp.data.code !==200) return this.$alert('添加演出类别失败', '添加演出类别异常通知', {
          confirmButtonText: '我知道了'
        })
        this.$message.success("添加演出类别成功")
      })
      axios.get('sysShow/find/'+this.showId).then(response=>{
        _this.editCategoryForm = response.data.data.showCategoryList
      })
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
</style>
