<template>
  <div>
    <el-card class="main-card">
      <el-container>
        <el-header>
          <el-card shadow="hover" style="height: 80px">
          <el-form ref="form" :model="form" style="width: 100%">
            <el-row>
              <el-col :span="7">
                <el-form-item class="el-form-item" label="科目:">
                  <el-select v-model="form.course" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item class="el-form-item" label="年级:">
                  <el-select v-model="form.rank" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="el-form-item" label="名称:">
                  <el-input v-model="form.name" style="width: 250px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item class="el-form-item">
                  <el-button @click="quire">查询</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
            </el-card>
        </el-header>
        <el-main>
          <div :key="items.value" v-for="items in options">
            <el-card shadow="hover" class="item-card">
              <el-row>
                <el-col :span="16">
                  <el-image class="el-image" :src="img"></el-image>
                  <div style="margin-left: 40px">{{items.value}}</div>
                </el-col>
                <el-col :span="8">
                  <div>{{T_name}}</div>
                  <el-button style="margin-top: 200px ">申请</el-button>
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
      img: require('../assets/images/shengwu1.jpg'),
      T_name: '李华',
      total: 100,
      options: [
        {
          value: '语文'
        },
        {
          value: '数学'
        },
        {
          value: '123'
        }],
      form: {
        course: '',
        rank: '',
        name: ''
      }
    }
  },
  methods: {
    quire () {
      console.log(this.form)
    },
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
  .el-form-item button{
    margin-left: 20px;
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
