import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import router from './router'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
// import Mock from './mock'
// Mock.bootstrap();//模拟数据
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

//取消了创建路由
// const router = new VueRouter({
//   routes
// })

// 用户手动刷新页面，这是路由会被重设，要重新新增

if (sessionStorage.getItem('user')) {
    // let routes = JSON.parse(sessionStorage.getItem('routes'))
    // console.log(4);
    // console.log(sessionStorage.getItem('routes'));
    let routes = JSON.parse(sessionStorage.getItem('routes'));
    store.dispatch("add_Routes", routes)
}
//全局前置钩子函数：router.beforeEach（），他的作用就是在每次路由切换的时候调用
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

