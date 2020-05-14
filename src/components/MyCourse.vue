<template>
  <div>
    <el-card class="main-card">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>我的课程</el-breadcrumb-item>
        <el-breadcrumb-item>当前课程</el-breadcrumb-item>
      </el-breadcrumb>
      <el-container>
        <el-main>
          <div :key="items.value" v-for="items in options">
            <el-card shadow="hover" class="item-card">
              <el-row>
                <el-col :span="16">
                  <el-image v-if="items.Cname=='生物'" class="el-image" :src="img1"></el-image>
                  <el-image v-else class="el-image" :src="img2"></el-image>
                  <div>{{items.Cname}}</div>
                </el-col>
                <el-col :span="8">
                  <div >{{items.Tname}}</div>
                  <div class="text">剩余课时:{{items.Ctime}}</div>
                  <el-button style="margin-top: 150px " @click="Dialog(items)">预约</el-button>
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
    <el-dialog title="选择预约时间" :visible.sync="dialogFormVisible" width="300px" top="15%">
      <el-date-picker
        v-model="value1"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
      <span slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="order">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from './common/date'
export default {
  data () {
    return {
      dialogFormVisible: false,
      total: 100,
      value1: '',
      img1: require('../assets/images/shengwu1.jpg'),
      img2: require('../assets/images/yuwen2.jpg'),
      options: [],
      item: [],
      form: {
        name: '',
        active: '0',
        number: '1'
      }
    }
  },
  methods: {
    handleCurrentChange (val) {
      console.log(val)
    },
    Dialog (items) {
      this.dialogFormVisible = true
      this.item = items
    },
    async order () {
      const time = formatDate(this.value1, 'yyyy-MM-dd hh:mm')
      this.item.ordertime = time
      await this.$http.post('orderCourse', this.item)
      this.dialogFormVisible = false
      this.$message({
        message: '预约成功',
        type: 'success'
      })
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
    margin-left: 20px;
    margin-top: 20px;
    width: 310px;
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
