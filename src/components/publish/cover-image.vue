<template>
  <div class="cover-image">
      <div v-for="(item,index) in list" :key="index" class="cover-item">
   <img :src="item ? item :defaultImg" alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收属性
  name: '',
  data () {
    return {
      defaultImg: require('../../assets/img/313400.jpg')
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.cover-image {
    display: flex;
    margin:20px 0;
    margin-left: 100px;
     .cover-item {
       border: 1px solid #ccc;
       width: 250px;
       height: 250px;
       padding: 10px;
       img {
         height: 100%;
         width:100%;
       }
     }
  }
</style>
