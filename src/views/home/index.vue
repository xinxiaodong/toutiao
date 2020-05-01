<template>
  <!-- 先放置外层容器 -->
  <el-container>
    <!-- 左右布局 -->
    <el-aside :style="{width: collapse ? '60px' : '230px'}" style="transition:all 0.3s; background-color:#353b4e; min-height:100vh;">
      <!-- 放置左侧组件 -->
      <layout-aside :collapse="collapse"></layout-aside>
    </el-aside>
    <!-- 放置外置容器 -->
    <el-container>
      <!-- 上下布局 -->
      <el-header>
        <!-- 头部组件 -->
        <layout-header></layout-header>
      </el-header>
      <!-- 主要区域 -->
      <el-main style="padding:0">
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  components: {

  },
  name: '',
  data () {
    return {
      collapse: false

    }
  },
  methods: {},
  created () {
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style lang="less" scoped>
</style>
