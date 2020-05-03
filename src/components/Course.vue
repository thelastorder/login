<template>
  <div>
    <el-card class="main-card">
      <el-container>
        <el-header>
          <el-card shadow="hover" style="height: 80px">
          <el-form ref="form" :model="form" style="width: 100%">
            <el-row>
              <el-col :span="6">
                <el-form-item class="el-form-item" label="科目:">
                  <el-select v-model="form.type" placeholder="请选择">
                    <el-option
                      v-for="item in courseName"
                      :key="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item class="el-form-item" label="年级:">
                  <el-select v-model="form.ranked" placeholder="请选择">
                    <el-option
                      v-for="item in rankName"
                      :key="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item class="el-form-item" label="名称:">
                  <el-input v-model="form.name" style="width: 180px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item class="el-form-item">
                  <el-button @click="quire" :class="{'buttons': !flag }">查询</el-button>
                  <el-button v-show="flag" @click="VisibleCourse">上传课程</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
            </el-card>
        </el-header>
        <el-main>
          <v-upload-course></v-upload-course>
          <div :key="items.Cid" v-for="items in options">
            <el-card shadow="hover" class="item-card">
              <el-row>
                <el-col :span="16">
                  <el-image class="el-image" :src="img"></el-image>
                  <div style="margin-left: 40px">{{items.name}}</div>
                </el-col>
                <el-col :span="8">
                  <div>{{items.teacher}}</div>
                  <el-button style="margin-top: 200px " @click="apply(items)">申请</el-button>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-main>
        <el-footer>
          <el-pagination class="foot"
            @current-change="handleCurrentChange"
            background layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </el-footer>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import bus from './common/bus'
import vUploadCourse from './uploadCourse'
export default {
  components: {
    vUploadCourse
  },
  data () {
    return {
      img: require('../assets/images/shengwu1.jpg'),
      T_name: '李华',
      flag: '',
      total: 100,
      options: [],
      rankName: [
        { value: '' }, { value: '1' }, { value: '2' }, { value: '3' }
      ],
      courseName: [
        { value: '语文' }, { value: '数学' }, { value: '英语' }, { value: '物理' },
        { value: '地理' }, { value: '生物' }, { value: '政治' }, { value: '化学' }
      ],
      form: {
        type: '',
        ranked: '',
        name: '',
        num: '1'
      }
    }
  },
  methods: {
    VisibleCourse () {
      bus.$emit('VisibleCourse', true)
    },
    apply (item) {
      item.username = window.sessionStorage.getItem('name')
      this.$http.post('applyCourse', item)
    },
    async quire () {
      const number = await this.$http.post('courseNum', this.form)
      this.total = Math.ceil(number.data / 3) * 10
      const course = await this.$http.post('course', this.form)
      this.options = course.data
    },
    async handleCurrentChange (val) {
      this.form.num = val
      const number = await this.$http.post('courseNum', this.form)
      this.total = Math.ceil(number.data / 3) * 10
      const course = await this.$http.post('course', this.form)
      this.options = course.data
    }
  },
  async created () {
    const state = window.sessionStorage.getItem('card')
    this.flag = state === '1'
    const number = await this.$http.post('courseNum', this.form)
    this.total = Math.ceil(number.data / 3) * 10
    const course = await this.$http.post('course', this.form)
    this.options = course.data
  }
}
</script>

<style scoped>
  .main-card{
    width: 1090px;
    height: 535px;
  }
  .buttons{
    margin-left: 30px;
  }
  .el-select{
    width: 180px;
  }
  .item-card{
    float: left;
    margin-left: 20px;
    margin-top: 20px;
    width: 310px;
    height: 300px;
  }
  .el-image{
    width: 150px;
    height: 220px;
  }
  .foot{
    width: 250px;
    margin-left: 300px;
    margin-top: 30px;
  }
</style>
