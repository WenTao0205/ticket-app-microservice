<template>
  <div>

    <div class="board">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>演出管理</el-breadcrumb-item>
        <el-breadcrumb-item>舞台剧热门管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-table :data="showList" style="width: 100%" border stripe>
      <el-table-column label="舞台剧" header-align="center" label-class-name="tableTitle">
        <el-table-column prop="title" label="演出名称"></el-table-column>
        <el-table-column prop="hall.name" label="演出场馆" width="300"></el-table-column>
        <el-table-column prop="price" label="演出票价" width="120"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="180"></el-table-column>
        <el-table-column prop="endTime" label="预计结束时间" width="180"></el-table-column>

        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="添加到舞台剧热门" placement="top" :enterable="false" :open-delay="500">
              <el-button type="success" icon="el-icon-plus" size="mini" @click="addToHot(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <el-table :data="hotShowList" style="width: 100%" border stripe>
      <el-table-column label="舞台剧热门" header-align="center" label-class-name="tableTitle">
        <el-table-column prop="title" label="演出名称"></el-table-column>
        <el-table-column prop="hall.name" label="演出场馆" width="300"></el-table-column>
        <el-table-column prop="price" label="演出票价" width="120"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="180"></el-table-column>
        <el-table-column prop="endTime" label="预计结束时间" width="180"></el-table-column>

        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="从舞台剧热门删除" placement="top" :enterable="false" :open-delay="500">
              <el-button type="danger" icon="el-icon-minus" size="mini" @click="deleteHot(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getShowList, updateShow } from '@/api/shows'

export default {
  name: 'TheatricalShow',
  data() {
    return {
      showList: [],
      hotShowList: []
    }
  },
  async created() {
    await this.setShowList()
    await this.setHotShowList()
  },
  methods: {
    async setShowList() {
      const { data } = await getShowList({ type: '舞台剧', rank: '无' })
      this.showList = data
      console.log(this.showList)
    },
    async setHotShowList() {
      const { data } = await getShowList({ type: '舞台剧', rank: '舞台剧热门' })
      this.hotShowList = data
      console.log(this.hotShowList)
    },
    async addToHot(row) {
      row.hallId = row.hall.id
      row.rank = '舞台剧热门'

      const res = await updateShow(row)
      if(res.status !== 200) {
        this.$message.error('添加舞台剧热门失败！')
        return
      }
      await this.setShowList()
      await this.setHotShowList()
      this.$message.success('添加舞台剧热门成功！')
    },
    async deleteHot(row) {
      row.hallId = row.hall.id
      row.rank = '无'

      const res = await updateShow(row)
      if(res.status !== 200) {
        this.$message.error('删除舞台剧热门失败！')
        return
      }
      await this.setHotShowList()
      await this.setShowList()
      this.$message.warning('删除舞台剧热门成功！')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .tableTitle {
  font-size: 18px;
  color: #000;
}
</style>