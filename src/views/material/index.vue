<template>
  <!-- 基本页面结构 -->
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <!-- 全部素材内容 -->
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <!-- 收藏素材内容 -->
        <div class="img-list">
           <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
           </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      activeName: 'all', // 默认选中全部
      list: [] // 接收全部数据
    }
  },
  methods: {
    // 切换tab事件
    changeTab () {

    },
    // 获取所有素材
    getAllMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect' }
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getAllMaterial() // 获取所有素材
  }
}
</script>

<style lang="less" scoped>
  .img-list{
    display: flex;
    flex-wrap: wrap;
      .img-card{
     width: 200px;
     height: 240px;
     margin: 20px 50px;
     position: relative;
     img{
       width: 100%;
       height: 100%;
     }
     .operate{
       width: 100%;
      font-size:20px;
      position:absolute;
      bottom: 0;
      background-color: #f4f5f6;
      height: 30px;
      left: 0;
     }
      }
  }
</style>
