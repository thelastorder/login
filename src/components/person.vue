<template>
 <div>
   <el-card style="height: 535px;width: 1085px">
     <el-row>
        <el-col :span="8">
          <el-upload
            class="avatar-uploader"
            :action="post"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <el-avatar class="el-avatar" :src='img'></el-avatar>
          </el-upload>
          <el-button class="button">点击上传</el-button>
          <div style="margin-left: 70px;margin-top: 40px">身份认证：学生</div>
        </el-col>
        <el-col :span="8" :offset="2">
          <div class="info" v-show="!change">
            <div>帐号：{{form.name}}</div>
            <div>昵称：{{form.val}}</div>
            <div>性别：{{form.sex}}</div>
            <div>年龄：{{form.age}}</div>
            <div>我的钱包：{{form.money}}</div>
            <el-button style="margin-top: 50px" @click="hand">修改信息</el-button>
            <el-button style="margin-top: 50px" @click="hand2">金钱充值</el-button>
            <el-button style="margin-top: 50px" @click="hand3">身份认证</el-button>
          </div>
          <el-form v-show="change" ref="form" :model="form" :rules="rules" :label-position="position" label-width="70px">
            <el-form-item label="昵称：" prop="val">
              <el-input v-model="form.val"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
              <el-select v-model="form.sex">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄：" prop="age">
              <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handed('form')">完成</el-button>
            </el-form-item>
          </el-form>
        </el-col>
     </el-row>
   </el-card>
   <v-promise></v-promise>
 </div>
</template>

<script>
import bus from './common/bus'
import vPromise from './promise'
export default {
  components: {
    vPromise
  },
  data () {
    return {
      post: this.$http.defaults.baseURL + 'image',
      position: 'left',
      change: false,
      img: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      form: {
        name: '帐号',
        val: '昵称',
        sex: '性别',
        age: '年龄',
        money: '金钱'
      },
      rules: {
        val: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.img = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    hand () {
      this.change = !this.change
    },
    hand2 () {
    },
    hand3 () {
      bus.$emit('Visible', true)
    },
    handed (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('person_c', this.form)
          this.change = !this.change
        } else {
          return this.$message.error('修改失败')
        }
      })
    }
  },
  async created () {
    this.form.name = window.sessionStorage.getItem('name')
    const result = await this.$http.post('person', this.form)
    this.form = result.data
  }
}
</script>

<style scoped lang="less">
  .info div{
    margin-top: 40px;
  }
  /deep/ .el-upload--text{
    width: 180px;
    border-radius: 50%;
    margin-left: 40px;
    }
  .el-avatar{
    height:180px;
    width: 180px
  }
  .button{
    margin-top: 20px;
    margin-left: 80px;
  }
</style>
