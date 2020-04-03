<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 登陆表单,表单容器 -->
      <el-form ref="myForm" style="margin-top: 30px" :model="loginForm" :rules="loginRules">
        <!-- el-form-item要放置prop=>要检验的字段名 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width: 70%" placeholder="请输入验证码"></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私协议</el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- 注册点击事件 -->
          <el-button @click="submitLogin" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      // 在data中定义一个表单对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选
      },
      loginRules: {
        // 验证规则 验证登陆表单的 key(字段名):value(数组)
        mobile: [
          { required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }
        ],
        // 自定义函数
        check: [
          {
            validator: function (rule, value, callback) {
              // rule当前的规则,没用
              // value要校验的字段的值
              if (value) {
                // 认为校验通过
                callback()
              } else {
                // 认为校验不通过
                callback(new Error('您必须无条件同意被我们坑'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    // 提交登陆表单
    submitLogin () {
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          // 认为校验登录表单成功
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            // 成功以后进入then
            window.localStorage.setItem('user-token', result.data.data.token) // 前端缓存令牌
          }).catch(error => {
            console.log(error)
          })
        }
      })
    }
  }
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
