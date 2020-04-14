<template>
  <el-dialog class="dialog" title="上传课程界面" :visible.sync="VisibleCourse">
    <el-form :model="Form" :rules="rules" ref="Form" :label-position="position" label-width="100px">
      <el-form-item prop="name" label="课程名称">
        <el-input v-model="Form.name" style="width: 220px">
        </el-input>
      </el-form-item>
      <el-form-item prop="type" label="课程种类">
        <el-select v-model="Form.type">
          <el-option label="语文" value="语文"></el-option>
          <el-option label="数学" value="数学"></el-option>
          <el-option label="英语" value="英语"></el-option>
          <el-option label="地理" value="地理"></el-option>
          <el-option label="政治" value="政治"></el-option>
          <el-option label="物理" value="物理"></el-option>
          <el-option label="化学" value="化学"></el-option>
          <el-option label="生物" value="生物"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="ranked" label="课程年级">
        <el-select v-model="Form.ranked">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="resetForm('Form')">取 消</el-button>
      <el-button type="primary" @click="submit('Form')">上 传</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from './common/bus'
export default {
  data () {
    return {
      position: 'left',
      VisibleCourse: false,
      Form: {
        name: '',
        type: '',
        ranked: '',
        teacher: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择课程种类', trigger: 'blur' }
        ],
        ranked: [
          { required: true, message: '请选择课程年级', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          await this.$http.post('addCourse', this.Form)
          this.VisibleCourse = false
        } else {
          return this.$message.error('上传失败')
        }
      })
    },
    resetForm (formName) {
      this.VisibleCourse = false
      this.$refs[formName].resetFields()
    }
  },
  created () {
    this.Form.teacher = window.sessionStorage.getItem('name')
    bus.$on('VisibleCourse', msg => {
      this.VisibleCourse = msg
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
