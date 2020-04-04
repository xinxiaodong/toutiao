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
        <el-dropdown>
          <span>{{userInfo.name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {

  data () {
    return {
      userInfo: {}, // 用户信息
      defaultImg: require('../../assets/img/305747.jpg') // 先把地址转换成变量
    }
  },
  created () {
    const token = window.localStorage.getItem('user-token') // 获取令牌
    // 查询数据
    this.$axios({
      url: '/user/profile',
      // header参数
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      this.userInfo = result.data.data // 获取用户个人信息
    })
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
