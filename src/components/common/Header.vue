<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="logo">后台管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
              <el-dropdown>
                <span class="el-dropdown-link">
                  个人中心<i  class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="go">个人信息</el-dropdown-item>
                  <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    // 用户名选择事件
    go () {
      this.$router.push('/person')
    },
    // 退出
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
        margin-left: 30px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
</style>
