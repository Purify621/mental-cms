<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">大学生心理健康测试网站管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-radio-group v-model="radio" @change="radioChange">
        <el-radio :label="1">管理员</el-radio>
        <el-radio :label="2">教师</el-radio>
      </el-radio-group>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位数字'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      radio: 1 // 控制登录状态
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // 单选按钮选择改变
    radioChange() {
      if (this.radio === 1) {
        this.loginForm.username = 'admin'
        this.loginForm.password = 'admin'
      } else if (this.radio === 2) {
        this.loginForm.username = 'teacher'
        this.loginForm.password = 'teacher'
      }
    },
    // 密码显示隐藏切换
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 开启loading
          this.loading = true
          if (this.radio === 1) {
            // 执行管理员登录的操作
            this.$store.dispatch('user/adminLogin', this.loginForm).then((data) => {
            // 登录成功的提示信息
              this.$message({
                message: data,
                type: 'success'
              })
              // 跳转到主页
              this.$router.push('/')
            }).catch((data) => {
            // 提示错误信息
              this.$message({
                message: data,
                type: 'error'
              })
            })
            // 无论成功或失败都关闭 loading
            this.loading = false
          } else if (this.radio === 2) {
            // 执行教师登录的操作
            this.$store.dispatch('user/teacherLogin', this.loginForm).then((data) => {
            // 登录成功的提示信息
              this.$message({
                message: data,
                type: 'success'
              })
              // 跳转到主页
              this.$router.push('/')
            }).catch((data) => {
            // 提示错误信息
              this.$message({
                message: data,
                type: 'error'
              })
              // 无论成功或失败都关闭 loading
              this.loading = false
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      color: black;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  // 整体输入框
  .el-form-item {
    border-radius: 5px;
    color: #454545;
    border: 1px solid #dcdfe6;
  }

  .el-radio-group{
    padding-bottom: 20px;
  }

}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background-image: url("http://img.lonely.icu//Purify-md/loginForm.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-form {
    position: relative;
    background: #fff;
    border-radius: 5px;
    width: 420px;
    max-width: 100%;
    padding: 50px 35px 0;
    margin: 160px auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: black;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 18px;
      color: #707070;
      margin: 0px auto 40px auto;
      text-align: center;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
