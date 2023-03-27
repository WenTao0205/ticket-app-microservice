<template>
  <div class="livehouseShow">
    <div class="filters">
      <div class="filter-item">
        <div class="filter-item-name">按城市：</div>
        <ul class="filter-item-list">
          <li class="fl" v-for="(item, index) in citys" :key="item"><a :class="index === city_index ? 'active' : ''" @click="getShowByCity(item, index)">{{ item }}</a></li>
        </ul>
      </div>
    </div>

    <div class="shows-container">
      <div class="show-item" v-for="item in livehouseShowList" :key="item.id" @click="toShowDetail(item.id)">
        <div class="show-inner">
          <div class="show-poster"><img :src="item.cover" alt=""></div>
          <div class="show-detail">
            <div class="show-name" :title="item.title">{{ item.title }}</div>
            <div class="bottom-align">
              <div class="align-left">
                <div class="show-time">{{ item.startTime }}</div>
                <div class="show-addr">{{ item.hall.name }}</div>
              </div>
              <div class="show-price">{{ item.price }} <span class="price-unit">元</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShowList } from '@/api/shows'

export default {
  name: 'livehouseShow',
  data() {
    return {
      city_index: 0,
      citys: ['深圳', '香港', '珠海', '湛江', '海口'],
      livehouseShowList: []
    }
  },
  created() {
    this.getShowByCity(this.citys[this.city_index], this.city_index)
  },
  methods: {
    async getShowByCity(city, index) {
      this.city_index = index
      const { data } = await getShowList({ type: 'LiveHouse' })
      this.livehouseShowList = data.filter(item => item.hall.city === city)
      console.log(this.livehouseShowList)
    },
    toShowDetail(id) {
      this.$router.push({ name: 'Show', query: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.livehouseShow {
  margin: 50px 15%;
  .filters {
    border-radius: 14px;
    background-color: #fff;
    border: 1px solid #ededed;
    font-size: 14px;
    .filter-item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 31px 0;
      .filter-item-name {
        padding: 0 20px 0 30px;
        height: 28px;
        line-height: 28px;
      }
      .filter-item-list {
        padding-left: 0;
        display: flex;
        width: 80%;
        .fl {
          list-style-type: none;
          a {
            display: block;
            width: 90px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            text-decoration: none;
            color: #494949;
            cursor: pointer;
          }
          .active {
            color: #fff;
            border-radius: 14px;
            background-image: linear-gradient(to left,#ff4655,#ff4287);
          }
        }
      }
    }
  }

  .shows-container {
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .show-item {
      .show-inner {
        display: flex;
        position: relative;
        margin-left: 28px;
        margin-top: 30px;
        margin-bottom: 60px;
        width: 480px;
        height: 190px;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 0 12px 0 #f0f0f0;
        border: 1px solid #f0f0f0;
        position: relative;
        .show-poster {
          position: relative;
          left: -28px;
          top: -30px;
          height: 190px;
          img {
            width: 150px;
            height: 210px;
            border-radius: 4px;
            box-shadow: 0 4px 16px 0 #ccc;
          }
        }
        .show-detail {
          position: relative;
          margin-right: 15px;
          margin-top: 15px;
          cursor: pointer;
          .show-name {
            font-size: 16px;
            color: #331612;
            line-height: 24px;
            height: 46px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .bottom-align {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            width: 100%;
            position: absolute;
            bottom: 10px;
            .align-left {
              .show-time {
                font-size: 12px;
                color: #494949;
                line-height: 20px;
              }
              .show-addr {
                font-size: 12px;
                color: #494949;
                line-height: 20px;
              }
            }
            .show-price {
              font-size: 20px;
              color: #ff4655;
              font-weight: 700;
              .price-unit {
                font-size: 12px;
                font-weight: 400;
              }
            }
          }
        }
      }
    }
  }
}
</style>