<template>
  <div>
    <div class="card">
      <el-card shadow="hover">
        <el-carousel>
          <el-carousel-item v-for="item in 4" :key="item">
            <el-image :src="url"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-card>
      <el-card style="margin-top: 10px;height: 180px">
        <div>当前时间：</div>
        <div style="margin-left: 30px;margin-top: 20px">{{nowTime}}</div>
      </el-card>
    </div>
    <div class="card2">
      <el-card shadow="hover">
        <el-container>
          <el-aside width="200px">
            <el-avatar style="height:120px;width: 120px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <div class="name">{{name}}</div>
          </el-aside>
          <el-main>
            <div class="box-right">
              <div>年龄：{{age}}</div>
              <div>身份：{{card}}</div>
              <div>帐号金额：{{money}}</div>
            </div>
          </el-main>
        </el-container>
      </el-card>
    </div>
    <div class="card2">
      <el-card style="height:350px">
        <el-table :data="tableData" stripe empty-text="暂无课程" style="width: 100%">
          <el-table-column prop="course" label="课程名称" width="180"></el-table-column>
          <el-table-column prop="Tname" label="授课老师" width="180"></el-table-column>
          <el-table-column prop="rank" label="课程年级"></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nowTime: '',
      name: '小华',
      age: '18',
      card: '学生',
      money: '200',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      tableData: [
      ]
    }
  },
  methods: {
    // 显示当前时间（年月日时分秒）
    time (timeStamp) {
      const year = new Date(timeStamp).getFullYear()
      const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
      const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
      const hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
      const mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
      const ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
      const week = new Date(timeStamp).getDay()
      const weeks = ['日', '一', '二', '三', '四', '五', '六']
      const getWeek = '星期' + weeks[week]
      this.nowTime = year + '年' + month + '月' + date + '日' + ' ' + hh + ':' + mm + ':' + ss + getWeek
    },
    nowTimes: function () {
      this.time(new Date())
      setInterval(this.nowTimes, 1000)
      this.clear()
    },
    clear () {
      clearInterval(this.nowTimes)
      this.nowTimes = null
    }
  },
  async created () {
    this.nowTimes()
    // 请求人员信息
    // const username = window.sessionStorage.getItem('username')
    // const result = await this.$http.get('person',username)
    // this.name = result.data.val
  }
}
</script>

<style scoped>
  .card{
    width: 45%;
    margin-top: 10px;
    margin-right: 10px;
    float: right;
  }
  .card2{
    margin-top: 10px;
    margin-left: 10px;
    width: 50%;
    float: left;
  }
  .name{
    width: 55%;
    text-align: center;
  }
  .box-right div{
    margin-top: 10px;
  }
</style>
