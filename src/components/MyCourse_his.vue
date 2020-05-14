<template>
  <div>
    <el-card class="main-card">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>我的课程</el-breadcrumb-item>
        <el-breadcrumb-item>历史课程</el-breadcrumb-item>
      </el-breadcrumb>
      <el-container>
        <el-main>
          <div :key="items.value" v-for="items in options">
            <el-card shadow="hover" class="item-card">
              <el-row>
                <el-col :span="14">
                  <el-image v-if="items.Cname=='高中生物'" class="el-image" :src="img1"></el-image>
                  <el-image v-else class="el-image" :src="img2"></el-image>
                  <div>{{items.Cname}}</div>
                </el-col>
                <el-col :span="10">
                  <div >{{items.Tname}}</div>
                  <div class="text">已完成</div>
                  <div style="margin-top: 100px">评价</div>
                  <el-rate v-model="items.value1" class="text"></el-rate>
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
export default {
  data () {
    return {
      total: 100,
      img1: require('../assets/images/shengwu1.jpg'),
      img2: require('../assets/images/yuwen2.jpg'),
      options: [{
        Cname: '语文',
        Tname: '老师'
      }, {
        Cname: '生物',
        Tname: '老师'
      }, {
        Cname: '语文',
        Tname: '老师'
      }],
      form: {
        name: '',
        active: '1',
        number: '1'
      }
    }
  },
  methods: {
    handleCurrentChange (val) {
    }
  },
  async created () {
    this.form.name = window.sessionStorage.getItem('name')
    const number = await this.$http.post('myCourseNum', this.form)
    this.total = Math.ceil(number.data / 3) * 10
    const course = await this.$http.post('myCourseInfo', this.form)
    this.options = course.data
  }
}
</script>

<style scoped>
  .main-card{
    width: 1090px;
    height: 535px;
  }
  .item-card{
    float: left;
    margin-left: 0px;
    margin-top: 20px;
    width: 330px;
    height: 300px;
  }
  .el-image{
    width: 150px;
    height: 220px;
  }
  .text{
    margin-top: 20px;
  }
  .foot{
    width: 250px;
    margin-left: 300px;
    margin-top: 30px;
  }
</style>
