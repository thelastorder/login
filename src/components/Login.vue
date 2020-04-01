<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-user-solid">帐号</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-s-goods">密码</el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button type="primary" style="margin-left: 50px" @click="open">注册</el-button>
                </div>
                <v-register></v-register>
            </el-form>
        </div>
    </div>
</template>

<script>
import vRegister from './register'
import bus from './common/bus'
export default {
  data: function () {
    return {
      dialogFormVisible: false,
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    vRegister
  },
  methods: {
    open () {
      bus.$emit('dialogFormVisible', true)
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 登录验证，利用token验证
          const result = await this.$http.post('login', this.ruleForm)
          if (result.data.code === '200') {
            window.sessionStorage.setItem('token', result.data.token)
            window.sessionStorage.setItem('username', this.ruleForm.name)
            this.$router.push('/home')
          } else {
            return this.$message.error(result.data.message)
          }
        } else {
          return this.$message.error('登录失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../assets/images/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: black;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn button{
        width:35%;
        height:36px;
        margin-bottom: 10px;
        margin-left: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>
