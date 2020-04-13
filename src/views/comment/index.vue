<template>
  <el-card>
  <bread-crumb slot="header">
    <!-- 插槽内容 -->
   <template slot="title">
        评论列表
   </template>
  </bread-crumb>
  <!-- body内容 -->
    <el-table :data="list">
<!--  label属性 -->
   <el-table-column prop="title" width="600" label="标题"></el-table-column>
   <!-- 格式化属性 -->
   <el-table-column :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
   <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
   <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
   <el-table-column prop="" label="操作">
       <template slot-scope="obj">

       <el-button type="text" size="small">修改</el-button>
       <el-button type="text" size="small" @click="openOrClose(obj.row)">{{obj.row.comment_status ? '关闭评论':'打开评论'}}</el-button>
       </template>
   </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      list: []
    }
  },

  methods: {
    // 请求评论列表
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results // 获取评论列表数据
      })
    },
    formatterBoolean (row, column, cellValue, index) {
      // row 当前行数据
      // column 当前列属性
      // cellValue 当前单元格的值
      // index 当前下标
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭评论方法
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      // $confirm确定时进入then 取消时进入catch
      this.$confirm(`你确定要${mess}评论吗?`).then(() => {
        // 用户确定要调用接口
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: {
            article_id: row.id
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
        // 打开或者关闭评论成功之后
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getComment() // 重新请求列表
        })
      })
    }
  },
  created () {
  // 调用请求数据方法
    this.getComment()
  }
}
</script>

<style lang="less" scoped>

</style>
