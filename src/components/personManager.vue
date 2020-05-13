<template>
    <div class="card2">
      <el-card style="height:500px">
        <el-table :data="tableData" stripe empty-text="暂无信息" style="width: 100%">
          <el-table-column prop="pid" label="用户编号" width="100"></el-table-column>
          <el-table-column prop="name" label="用户帐号" width="120"></el-table-column>
          <el-table-column prop="val" label="用户昵称" width="120"></el-table-column>
          <el-table-column prop="sex" label="用户性别" width="120"></el-table-column>
          <el-table-column prop="card" label="用户身份" width="120"></el-table-column>
          <el-table-column prop="money" label="用户金额" width="120"></el-table-column>
          <el-table-column prop="phone" label="用户电话" width="180"></el-table-column>
          <el-table-column prop="time" label="注册时间"></el-table-column>
        </el-table>
      </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        id: '',
        name: ''
      },
      tableData: [
      ]
    }
  },
  methods: {
  },
  async created () {
    // 请求人员信息
    const table = await this.$http.get('personManager')
    this.tableData = table.data
    console.log(this.tableData)
  }
}
</script>

<style scoped>

  .card2{
    margin-top: 10px;
    margin-left: 10px;
    width: 100%;
    float: left;
  }
</style>
