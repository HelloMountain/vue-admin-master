import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import NotFound from "../views/404";


Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    }
  ]
})
