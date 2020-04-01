<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 登陆表单,表单容器 -->
        <el-form>
          <el-form-item>
            <el-input  placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 70%"  placeholder="验证码"></el-input>
            <el-button style="float:right" plain>发送验证码</el-button>
          </el-form-item>
          <el-form-item>
              <el-checkbox>我已阅读并同意用户协议和隐私协议</el-checkbox>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" style="width:100%">登录</el-button>
          </el-form-item>
        </el-form>
    </el-card>
  </div>
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

<style scoped lang="less" >
// scoped属性,只会对当前组件样式起作用,原理:为当前标签生成date-v-随机数
// 100vh相当于当前可视区域的100%高度
.login {
  background: url("../../assets/img/login_bg.jpg");
  background-size: cover; // 自适应背景图片
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 350px;
    .title {
      text-align: center;
      img {
        height: 44px;
      }
    }
  }
}
</style>
