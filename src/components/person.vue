<template>
 <div>
   <el-card style="height: 535px">
     <el-row>
        <el-col :span="6">
            <el-avatar style="height:180px;width: 180px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <el-button class="button">点击上传</el-button>
        </el-col>
        <el-col :span="12">
          <div class="info">帐号：</div>
          <div class="info">昵称：</div>
          <div class="info">我的头像：</div>
          <div class="info">我的头像：</div>
          <div class="info">我的头像：</div>
        </el-col>
     </el-row>
   </el-card>
 </div>
</template>

<script>

</script>

<style scoped lang="less">
  .info{
    margin-top: 40px;
  }
  .button{
    margin-top: 20px;
    margin-left: 40px;
  }
</style>
