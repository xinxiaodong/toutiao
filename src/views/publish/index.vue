<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="publishRules"
      style="margin-left:50px"
      label-width="100px"
    >
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <quill-editor style="height:300px" v-model="formData.content" type="textarea" :rows="4"></quill-editor>
      </el-form-item>
      <el-form-item style="margin-top:100px" prop="type" label="封面">
        <el-radio-group @change="changeType" v-model="formData.cover.type ">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 放置封面组件 -->
      <cover-image @clickOneImg="receiveImg" :list="formData.cover.images"></cover-image>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id" value>
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publishArticle()" type="primary">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      channels: [], // 定义一个channels接收频道
      formData: {
        title: '', // 标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1自动 0-无图 1-1张 3-3张
          images: [] // 存储图片的地址

        },
        channel_id: null // 频道id
      },
      publishRules: {
        // 校验规则对象
        title: [{ required: true, message: '标题内容不能为空' },
          { min: 5, max: 30, message: '标题长度需要在5-30字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        this.getArticleById(to.params.articleId)
      } else {}
      this.formData = {
        title: '', // 标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1自动 0-无图 1-1张 3-3张
          images: [] // 存储图片的地址

        }
      }
    }
    // // 监控嵌套对象中的值
    // 'formData.cover.type': function () {
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     // 无图或自动模式
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = [''] // 单图模式
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', ''] // 三图模式
    //   }
    // }
  },
  methods: {
    receiveImg (img, index) {
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? img : item) // 直接修改数据
    },
    // 切换类型时触发
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        // 无图或自动模式
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 单图模式
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 三图模式
      }
    },
    // 获取文章详情
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 将指定文章数据给data
      })
    },
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道数据
      })
    },
    // 发布文章
    publishArticle (draft) {
      this.$refs.publishForm.validate((isOK) => {
        if (isOK) {
          const { articleId } = this.$route.params // 获取动态路由参数
          this.$axios({
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : '/articles',
            params: { draft }, // query参数
            data: this.formData
          }).then(() => {
            this.$router.push('/home/articles') // 回到内容列表
          })
          // if (articleId) {
          //   this.$axios({
          //     method: 'put',
          //     url: `/articles/${articleId}`,
          //     params: { draft }, // query参数
          //     data: this.formData
          //   })
          // } else {
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft }, // query参数
          //     data: this.formData
          //   }).then(() => {
          //     this.$router.push('/home/articles') // 回到内容列表
          //   })
          // }
        }
      })
    }
  },
  created () {
    this.getChannels() // 接收频道数据
    const { articleId } = this.$route.params // 获取动态路由参数
    if (articleId) {
      articleId && this.getArticleById(articleId)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
