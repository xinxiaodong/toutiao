<template>
  <el-card>
  <bread-crumb slot="header">
    <!-- 插槽内容 -->
   <template slot="title">
        评论列表
   </template>
  </bread-crumb>
  <!-- body内容 -->
    <el-table>
<!--  label属性 -->
   <el-table-column width="600" label="标题"></el-table-column>
   <el-table-column label="评论状态"></el-table-column>
   <el-table-column label="总评论数"></el-table-column>
   <el-table-column label="粉丝评论数"></el-table-column>
   <el-table-column label="操作"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>

</style>
