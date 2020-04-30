<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <div class="select-img-list">
        <!-- 循环生成选择列表 -->
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img @click="clickImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <!-- 放置分页组件 -->
      <el-row type="flex" align="middle" justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">上传图片</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      activeName: 'material', // 默认选择素材
      list: [], // 接收素材库数据
      page: {
        // 专门放置分页数据
        total: 0, // 数据总条数
        pageSize: 8, // 默认每页条数
        currentPage: 1 // 当前页码 默认第一页
      }
    }
  },
  methods: {
    // 选择图片
    clickImg (url) {
      this.$emit('selectOneImg', url)
    },
    // 改变页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    // 获取所有的素材
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 获取全部数据
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 赋值总页数
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-card {
    width: 120px;
    height: 120px;
    margin: 10px 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
