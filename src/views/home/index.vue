<template>
  <!-- 先放置外层容器 -->
  <el-container>
    <!-- 左右布局 -->
    <el-aside>左侧</el-aside>
    <!-- 放置外置容器 -->
    <el-container>
      <!-- 上下布局 -->
      <el-header>头部</el-header>
      <!-- 主要区域 -->
      <el-main>主要区域</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
