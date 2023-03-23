<template>
  <el-container class="home-container">
    <el-header>
      <div class="span-container" style="padding: 5px" @click="toWelcome">
        <span>&nbsp;&nbsp;</span>
        <img src="../assets/logo.png" alt="" height="40px" width="40px">
        <span>得票管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapsed ? '64px' : '250px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--侧边栏菜单-->
        <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            :collapse="isCollapsed"
            :collapse-transition="false"
            :default-active="$route.path">
          <!--一级菜单-->
          <el-menu-item v-for="item in menuList"
                      :index="String(item.id)" :key="item.id" @click="toSubMenu(item.url)">
            <!--一级菜单的模板区域-->
            <template slot="title">
              <!--图标-->
              <i :class="iconList[item.id]"></i>
              <!--文本-->
              <span slot="title">{{ item.name }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>



<script>
export default {
  name: "Home",
  data() {
    return {
      //左侧菜单数据
      menuList: [
        { id: 1, name: '用户管理', url: 'User' },
        { id: 2, name: '演播厅管理', url: 'Hall' },
        { id: 3, name: '演出管理', url: 'Movie' },
        { id: 4, name: '订单管理', url: 'Bill' }
      ],
      iconList: {
        '1': 'el-icon-user',
        '2': 'el-icon-location-outline',
        '3': 'el-icon-mic',
        '4': 'el-icon-document-checked'
      },
      isCollapsed: false
    }
  },
  methods: {
    toSubMenu(url) {
      this.$router.push({ name: url })
    },
    logout() {
      this.$router.push('/login')
    },
    // 菜单展开与闭合：点击事件
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
    },
    toWelcome(){
      this.$router.push('/welcome')
    }
  }
}
</script>

<style scoped>

.home-container{
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: whitesmoke;
  font-size: 20px;
}

.el-header > div{
  display: flex;
  align-items: center;
}

div > span{
  margin-left: 15px;
}

.el-aside {
  background-color: #333744;
}


.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.1em;
  cursor: pointer;
}

.span-container{
  cursor: pointer;
}

.el-main{
  background: url("../assets/welcome.jpg");
  background-size: cover;
}

.el-menu{
  border: solid 0 grey;
}
</style>
