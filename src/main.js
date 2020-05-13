import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VideoPlayer from 'vue-video-player'
require('vue-video-player/node_modules/video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)

axios.defaults.baseURL = 'http://localhost:8080/'
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
