<template>
  <!-- 基本页面结构 -->
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-row type="flex" justify="end">
      <el-upload :http-request="uploadImg" action="">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <!-- 素材 -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i @click="collectOrCancel(item)" :style="{color: item.is_collected ? 'red' : ''}" class="el-icon-star-on"></i>
              <i @click="delMaterial(item.id)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <!-- 全部素材内容 -->
        <el-row type="flex" justify="center" style="height:80px" align="middle">
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
      <el-tab-pane label="收藏素材" name="collect">
        <!-- 收藏素材内容 -->
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type="flex" justify="center" style="height:80px" align="middle">
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
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      loading: false, // 定义一个变量
      activeName: 'all', // 默认选中全部
      list: [], // 接收全部数据
      page: {
        // 专门放置分页数据
        total: 0, // 数据总条数
        pageSize: 8, // 默认每页条数
        currentPage: 1 // 当前页码 默认第一页
      }
    }
  },
  methods: {
    // 删除素材
    async delMaterial (id) {
      await this.$confirm('您确定要删除该素材吗')
      await this.$axios({
        url: `/user/images/${id}`,
        method: 'delete'
      })
      this.getAllMaterial()
    },
    // 收藏或者取消收藏
    async collectOrCancel (row) {
      await this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected // 状态取反
        }
      })
      this.getAllMaterial()
    },
    // 上传图片
    async uploadImg (params) {
      this.loading = true // 打开进度条
      const form = new FormData()
      form.append('image', params.file) // 添加文件到form
      await this.$axios({
        url: 'user/images',
        method: 'post',
        data: form // FormData数据
      })
      // 说明已经成功上传一张图片
      this.loading = false // 关闭进度条
      this.getAllMaterial()
    },
    // 切换页码
    changePage (newPage) {
      this.page.currentPage = newPage // 得到最新页码
      this.getAllMaterial()
    },
    // 切换tab事件
    changeTab () {
      this.page.currentPage = 1
      this.getAllMaterial()
    },
    // 获取所有素材
    async getAllMaterial () {
      const result = await this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      })
      this.list = result.data.results
      this.page.total = result.data.total_count // 图片总数
    }
  },
  created () {
    this.getAllMaterial() // 获取所有素材
  }
}
</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 240px;
    margin: 20px 50px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      width: 100%;
      font-size: 20px;
      position: absolute;
      bottom: 0;
      background-color: #f4f5f6;
      height: 30px;
      left: 0;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
