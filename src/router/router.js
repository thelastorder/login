import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/person',
          component: resolve => require(['../components/person.vue'], resolve)
        },
        {
          path: '/course',
          component: resolve => require(['../components/Course.vue'], resolve)
        },
        {
          path: '/MyCourse',
          component: resolve => require(['../components/MyCourse.vue'], resolve)
        },
        {
          path: '/MyCourse_his',
          component: resolve => require(['../components/MyCourse_his.vue'], resolve)
        },
        {
          path: '/Info',
          component: resolve => require(['../components/Info.vue'], resolve)
        },
        {
          path: '/First',
          component: resolve => require(['../components/FirstApp.vue'], resolve)
        }]
    }
  ]
})

// token验证以便进行登录拦截
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
