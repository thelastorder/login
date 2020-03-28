<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                        <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import bus from './bus.js'
export default {
  data () {
    return {
      tagsList: [],
      collapse: false
    }
  },
  components: {
    vHead, vSidebar
  },
  created () {
    // 跳入首页
    // this.$router.push('/First')
    // 用来收缩导航栏
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>
