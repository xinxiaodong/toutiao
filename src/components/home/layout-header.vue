<template>
  <!-- 头部组件 -->
  <el-row class="layout-header" type="flex" align="middle" justify="space-between">
    <!-- 左侧 -->
    <el-col class="left" :span="6">
      <!-- 左侧图标   -->
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <!-- 右侧 -->
    <el-col class="right" :span="4">
      <el-row type="flex" justify="end" align="middle">
        <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt />
        <!-- 下拉菜单 -->
        <el-dropdown @command="handle">
          <span>{{userInfo.name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="lgout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {

  data () {
    return {
      userInfo: {}, // 用户信息
      defaultImg: require('../../assets/img/305747.jpg') // 先把地址转换成变量
    }
  },
  created () {
    // 查询数据
    this.getUserInfo()
    // 实例创建完毕 立刻监听
    eventBus.$on('updateUserInfoSuccess', () => {
      this.getUserInfo()
    })
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
        // header参数

      }).then(result => {
        this.userInfo = result.data // 获取用户个人信息
      })
    },
    handle (command) {
      // 判断command
      if (command === 'lgout') {
        // 退出
        window.localStorage.removeItem('user-token') // 删除用户的令牌
        this.$router.push('/login') // 回到登录页
      } else if (command === 'git') {
        window.location.href = 'https://github.com/xinxiaodong/toutiao'
      } else if (command === 'info') {
        this.$router.push('/home/account') // 跳转到帐户信息页面
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 60px;
  .left {
    font-size: 18px;
    .title {
      margin-left: 4px;
      color: #2c3e50;
      font-size: 16px;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}
</style>
