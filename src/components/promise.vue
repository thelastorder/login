<template>
  <el-dialog class="dialog" title="身份认证" :visible.sync="Visible">
    <el-form :model="Form" :rules="rules" ref="Form" :label-position="position" label-width="70px">
      <el-form-item prop="name" label="姓名">
        <el-input v-model="Form.name">
        </el-input>
      </el-form-item>
      <el-form-item prop="val" label="身份证">
        <el-input v-model="Form.val">
        </el-input>
      </el-form-item>
      <el-form-item prop="val" label="身份">
        <el-select v-model="Form.card">
          <el-option label="老师" value="老师"></el-option>
          <el-option label="家长" value="家长"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="resetForm('Form')">取 消</el-button>
      <el-button type="primary" @click="submit('Form')">认 证</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from './common/bus'
export default {
  data () {
    return {
      position: 'left',
      Visible: false,
      Form: {
        name: '',
        val: '',
        card: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        val: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入身份证', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          // await this.$http.post('register', this.Form)
          this.Visible = false
        } else {
          return this.$message.error('认证失败')
        }
      })
    },
    resetForm (formName) {
      this.Visible = false
      console.log(this.Form)
      this.$refs[formName].resetFields()
    }
  },
  created () {
    bus.$on('Visible', msg => {
      this.Visible = msg
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
