<template>
  <div >
    <div class="container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`未处理消息(${unread.length})`" name="first">
          <el-table :data="unread" :show-header="false" style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" width="180"></el-table-column>
            <el-table-column width="180">
              <template slot-scope="scope">
                <el-row>
                  <el-button size="small" type="primary" @click="handleRead(scope.$index)">同意</el-button>
                  <el-button size="small" type="danger" @click="handleRead(scope.$index)">拒绝</el-button>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="primary" @click="handleReadAll">全部标为已读</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`已处理消息(${read.length})`" name="second">
        <template v-if="message === 'second'">
          <el-table :data="read" :show-header="false" style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <span class="message-title">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" width="180"></el-table-column>
            <el-table-column prop="state" width="80"></el-table-column>
            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="danger">删除全部</el-button>
          </div>
        </template>
      </el-tab-pane>
        <el-tab-pane :label="`我的申请(${info.length})`" name="third">
          <template v-if="message === 'third'">
            <el-table :data="info" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="180"></el-table-column>
              <el-table-column prop="state" width="120"></el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'first',
      showHeader: false,
      unread: [{
        date: '2020-03-19 21:00:00',
        title: '学生张三向你申请授课'
      }, {
        date: '2020-03-19 21:00:00',
        title: '学生李四向你申请授课'
      }, {
        date: '2020-03-19 21:00:00',
        title: '学生王五向你申请授课'
      }],
      read: [{
        state: '已拒绝',
        date: '2020-03-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
      }],
      info: [{
        state: '申请中',
        date: '2020-03-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
      }]
    }
  },
  methods: {
    handleRead (index) {
      const item = this.unread.splice(index, 1)
      this.read = item.concat(this.read)
    },
    handleReadAll () {
      const item = this.unread.splice(0)
      this.read = item.concat(this.read)
    },
    handleDel (index) {
      const item = this.read.splice(index, 1)
      console.log(item)
    }
  },
  async created () {
    const name = window.sessionStorage.getItem('name')
    await this.$http.get('info', {
      params: {
        name: name
      }
    }).then(res => {
      console.log(res)
    })
  },
  computed: {
  }
}

</script>

<style>
  .message-title{
    cursor: pointer;
  }
  .handle-row{
    margin-top: 30px;
  }
</style>
