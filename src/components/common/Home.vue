<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar v-show="flag"></v-sidebar>
        <v-sidebar-t v-show="!flag"></v-sidebar-t>
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
import vSidebarT from './Sidebar_teacher'
import bus from './bus.js'
export default {
  data () {
    return {
      flag: true,
      collapse: false
    }
  },
  components: {
    vHead, vSidebar, vSidebarT
  },
  created () {
    const state = window.sessionStorage.getItem('card')
    if (state === '2') {
      this.flag = false
    }
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>
