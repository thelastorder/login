<template>
  <el-dialog class="dialog" title="注册界面" :visible.sync="dialogFormVisible">
    <el-form :model="Form" :rules="rules" ref="Form" label-width="0px">
      <el-form-item prop="name">
        <el-input v-model="Form.name">
          <el-button slot="prepend" icon="el-icon-user-solid">帐 号</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="val">
        <el-input v-model="Form.val">
          <el-button slot="prepend" icon="el-icon-user-solid">昵 称</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
      <el-input v-model.number="Form.phone">
        <el-button slot="prepend" icon="el-icon-s-goods">手机号</el-button>
      </el-input>
    </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="Form.password">
          <el-button slot="prepend" icon="el-icon-s-goods">密 码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="Form.checkPass">
          <el-button slot="prepend" icon="el-icon-s-goods">确认密码</el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="resetForm('Form')">取 消</el-button>
      <el-button type="primary" @click="submit('Form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from './common/bus'
export default {
  data: function () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.Form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      const reg = /^[1][3-9][0-9]{9}$/
      if (value === '' || value === undefined || value === null) {
        callback()
      } else {
        if ((!reg.test(value)) && value !== '') {
          callback(new Error('请输入正确的电话号码'))
        } else {
          callback()
        }
      }
    }
    const validateName = async (rule, value, callback) => {
      const values = { value: value }
      const result = await this.$http.post('personID', values)
      console.log(result)
      if (result.data > '0') {
        callback(new Error('用户名重复'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      Form: {
        phone: '',
        name: '',
        val: '',
        password: '',
        checkPass: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ],
        val: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          await this.$http.post('register', this.Form)
          this.dialogFormVisible = false
        } else {
          return this.$message.error('注册失败')
        }
      })
    },
    resetForm (formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    }
  },
  created () {
    bus.$on('dialogFormVisible', msg => {
      this.dialogFormVisible = msg
    })
  }
}
</script>

<style lang="less" scoped>
  .dialog{
    position: fixed;
    margin-left: 15%;
    margin-top: 15px;
    width:70%;
    overflow: hidden;
  }
  .el-button{
    width: 120px;
  }
</style>
