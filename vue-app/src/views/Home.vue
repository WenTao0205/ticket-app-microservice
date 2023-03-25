<template>
  <div class="app">

    <div class="main">
      <el-carousel type="card" :interval="6000" loop>
        <el-carousel-item v-for="item in posterList" :key="item.url">
          <img :src="item.url" alt/>
        </el-carousel-item>
      </el-carousel>

      <div class="showList">
        <div class="showItem" v-for="item in showList" :key="item.id" @click="toShowDetail(item.id)">
          <div class="showItemCover">
            <img :src="item.cover" style="object-fit: cover;" />
          </div>
          <div class="city">{{ item.hall.city }}</div>
          <div class="showItemTitle">
            <p class="title">{{ item.title }}</p>
          </div>
          <div class="showItemInfo">
            <span class="showDate">{{ item.startTime }}</span>
            <span class="showPrice">￥{{ item.price }}</span>
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
      showList: [],
      posterList: [
        {url: 'https://img0.tking.cn/mtl/default/img/HEy43fam6j_.png'},
        {url: 'https://img0.tking.cn/mtl/default/img/xyTmMSH6tG_.png'},
        {url: 'https://img0.tking.cn/mtl/default/img/XCCJ5iY6rZ_.jpg'},
        {url: 'https://img0.tking.cn/mtl/default/img/zP8MNpJz5p_.jpg'}
      ]
    }
  },
  created() {
    this.getShowList()
  },
  methods: {
    async getShowList() {
      const res = await getShowList()
      this.showList = res.data
      console.log(this.showList)
    },
    async toShowDetail(id) {
      this.$router.push({ name: 'Show', query: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  padding: 50px 300px;
  .showList {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    margin-top: 50px;
    .showItem {
      position: relative;
      margin: 0 18px 18px 0;
      border: 1px solid #ebebeb;
      border-radius: 5px;
      width: 280px;
      height: 500px;
      cursor: pointer;
      .showItemCover {
        img {
          border-radius: 5px 5px 0 0;
        }
      }
      .city {
        position: absolute;
        top: 16px;
        right: 16px;
        background: linear-gradient(-45deg,#262626,#464441);
        opacity: .8;
        border-radius: 2px;
        font-size: 16px;
        color: #fff;
        padding: 2px 8px;
      }
      .showItemTitle {
        margin-top: 26px;
        .title {
          font-size: 18px;
          color: #181818;
          padding: 0 10px;
        }
      }
      .showItemInfo {
        display: flex;
        align-items: center;
        gap: 20px;
        .showDate {
          font-size: 18px;
          color: #666;
          padding-left: 10px;
        }
        .showPrice {
          font-size: 22px;
          color: #e93a00;
          padding-right: 10px;
        }
      }

      &:hover {
        box-shadow: 6px 6px 6px #dfdfdf;
      }
    }
  }
}
</style>