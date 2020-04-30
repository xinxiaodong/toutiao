<template>
  <div class="cover-image">
    <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-item">
      <img :src="item ? item :defaultImg" alt />
    </div>
    <el-dialog :visible="dialogVisible" @close="closeDialog">
        <select-image @selectOneImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收属性
  name: '',
  data () {
    return {
      dialogVisible: false, // 控制弹层打开关闭的变量
      defaultImg: require('../../assets/img/313400.jpg'), // 将图片变成变量
      selectIndex: -1
    }
  },
  methods: {
    // 接收方法
    receiveImg (img) {
      this.$emit('clickOneImg', img, this.selectIndex) // 再次触发自定义事件
      this.closeDialog()
    },
    // 打开弹层
    openDialog (index) {
      this.selectIndex = index // 记住点击的下标
      this.dialogVisible = true
    },
    // 关闭弹层
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image {
  display: flex;
  margin: 20px 0;
  margin-left: 100px;
  .cover-item {
    border: 1px solid #ccc;
    width: 250px;
    height: 250px;
    padding: 10px;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
