<template>
  <div class="app">

    <el-carousel :interval="6000" type="card" height="400px" loop>
      <el-carousel-item v-for="item in posterList" :key="item.url">
        <img :src="item.url" alt="">
      </el-carousel-item>
    </el-carousel>

    <div class="main">
      <div class="showSection">
        <div class="section-header">
          <div class="section-name">演唱会热门</div>
          <div class="section-operation"><a href="/#/concertShow" style="color: #ff4655;text-decoration: none;">查看更多</a></div>
        </div>

        <div class="section-shows">
          <div class="section-show" v-for="item in concertShowList" :key="item.id" @click="toShowDetail(item.id)">
            <div class="image-holder">
              <img :src="item.cover" :data-src="item.cover" :alt="item.title">
            </div>
            <div class="show-detail">{{ item.title }}</div>
            <div class="show-price">{{ item.price }}元</div>
          </div>
        </div>
      </div>

      <div class="showSection">
        <div class="section-header">
          <div class="section-name">音乐会热门</div>
          <div class="section-operation"><a href="/#/instrumentShow" style="color: #ff4655;text-decoration: none;">查看更多</a></div>
        </div>

        <div class="section-shows">
          <div class="section-show" v-for="item in instrumentShowList" :key="item.id" @click="toShowDetail(item.id)">
            <div class="image-holder">
              <img :src="item.cover" :data-src="item.cover" :alt="item.title">
            </div>
            <div class="show-detail">{{ item.title }}</div>
            <div class="show-price">{{ item.price }}元</div>
          </div>
        </div>
      </div>

      <div class="showSection">
        <div class="section-header">
          <div class="section-name">舞台剧热门</div>
          <div class="section-operation"><a href="/#/theatrialShow" style="color: #ff4655;text-decoration: none;">查看更多</a></div>
        </div>

        <div class="section-shows">
          <div class="section-show" v-for="item in theatrialShowList" :key="item.id" @click="toShowDetail(item.id)">
            <div class="image-holder">
              <img :src="item.cover" :data-src="item.cover" :alt="item.title">
            </div>
            <div class="show-detail">{{ item.title }}</div>
            <div class="show-price">{{ item.price }}元</div>
          </div>
        </div>
      </div>

      <div class="showSection">
        <div class="section-header">
          <div class="section-name">音乐会热门</div>
          <div class="section-operation"><a href="/#/livehouseShow" style="color: #ff4655;text-decoration: none;">查看更多</a></div>
        </div>

        <div class="section-shows">
          <div class="section-show" v-for="item in livehouseShowList" :key="item.id" @click="toShowDetail(item.id)">
            <div class="image-holder">
              <img :src="item.cover" :data-src="item.cover" :alt="item.title">
            </div>
            <div class="show-detail">{{ item.title }}</div>
            <div class="show-price">{{ item.price }}元</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShowList } from '../api/shows'

export default {
  name: 'home',
  data() {
    return {
      concertShowList: [],
      instrumentShowList: [],
      theatrialShowList: [],
      livehouseShowList: [],
      posterList: [
        {url: 'https://img0.tking.cn/mtl/default/img/HEy43fam6j_.png'},
        {url: 'https://img0.tking.cn/mtl/default/img/xyTmMSH6tG_.png'},
        {url: 'https://img0.tking.cn/mtl/default/img/XCCJ5iY6rZ_.jpg'},
        {url: 'https://img0.tking.cn/mtl/default/img/zP8MNpJz5p_.jpg'}
      ]
    }
  },
  created() {
    this.getConcertShowList()
    this.getInstrumentShowList()
    this.getTheatrialShowList()
    this.getLiveHouseShowList()
  },
  methods: {
    async getConcertShowList() {
      const res = await getShowList({ rank: '演唱会热门' })
      this.concertShowList = res.data
    },
    async getInstrumentShowList() {
      const res = await getShowList({ rank: '音乐会热门' })
      this.instrumentShowList = res.data
    },
    async getTheatrialShowList() {
      const res = await getShowList({ rank: '舞台剧热门' })
      this.theatrialShowList = res.data
    },
    async getLiveHouseShowList() {
      const res = await getShowList({ rank: 'LiveHouse热门' })
      this.livehouseShowList = res.data
    },
    async toShowDetail(id) {
      this.$router.push({ name: 'Show', query: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .el-carousel {
  padding: 50px 0;
  width: 90%;
  margin: 0 auto;
}

.main {
  margin: 0 20%;
  .showSection {
    width: 100%;
    padding-top: 0;
    padding-bottom: 90px;
    .section-header {
      position: relative;
      display: flex;
      align-items: center;
      .section-name {
        font-size: 30px;
        height: 40px;
        line-height: 40px;
        vertical-align: bottom;
      }
      .section-operation {
        position: absolute;
        right: 0;
        font-size: 20px;
        color: #ff4655;
        line-height: 40px;
        vertical-align: baseline;
        cursor: pointer;
      }
    }

    .section-shows {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      .section-show {
        width: 150px;
        font-size: 14px;
        margin-top: 30px;
        height: 300px;
        text-align: left;
        cursor: pointer;
        .image-holder {
          position: relative;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 100%;
            height: 210px;
          }
        }
        .show-detail {
          padding-top: 15px;
          font-weight: 500;
          padding-bottom: 5px;
          font-size: 14px;
          line-height: 22px;
          height: 40px;
          color: #323038;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .show-price {
          color: #ff4655;
          padding-top: 5px;
          font-size: 20px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>