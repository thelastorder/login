<template>
  <div>
    <el-card class="main-card">
      <el-container>
        <el-main>
          <div :key="items.value" v-for="items in options">
            <el-card shadow="hover" class="item-card">
              <el-row>
                <el-col :span="16">
                  <el-image class="el-image" :src="img"></el-image>
                  <div>{{items.value}}</div>
                </el-col>
                <el-col :span="8">
                  <div>李华</div>
                  <el-button style="margin-top: 200px ">预约</el-button>
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
      img: require('../assets/images/shengwu1.jpg'),
      options: [
        {
          value: '语文'
        },
        {
          value: '数学'
        },
        {
          value: '111'
        }],
      form: {
        course: ''
      }
    }
  },
  methods: {
    handleCurrentChange (val) {
    }
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
  .foot{
    width: 250px;
    margin-left: 300px;
    margin-top: 30px;
  }
</style>
