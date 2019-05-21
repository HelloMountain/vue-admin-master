import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/nav1-Table.vue'
import TableServer from './views/nav1/nav1-TableServer'
import Form from './views/nav1/nav1-Form.vue'
import privilege from './views/nav1/nav1-PrivilegeTable'
import user from './views/nav1/nav1-user.vue'
import Page4 from './views/nav2/nav2-Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import code from './views/charts/charts-code.vue'
import topBrowser from './views/charts/topBrowser.vue'
import topBrowser2 from './views/charts/charts-topBrowser2.vue'
import pvuv from './views/charts/charts-vPU.vue'
import mapcharts from './views/charts/charts-map'
import topIP from './views/charts/charts-topIP.vue'
import uv from './views/charts/echarts-uv'
import map from './views/charts/charts-map.vue'
import response from './views/charts/charts-Responsetime'
// import Toast from './views/charts/toast'

// let a = sessionStorage.getItem('role');
// console.log(a);
// console.log(sessionStorage.getItem('role'));

let routes = [
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
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '管理信息',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'User' },
            { path: '/tableuser', component: TableServer, name: 'Server' },
            // { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
            { path: '/privilege', component: privilege, name: '权限' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '安装引导',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '安装引导' },
            // { path: '/page5', component: Page5, name: '页面5' },
            // { path: '/toast', component: Toast, name: 'toast' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '数据可视化    ',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: code, name: '网站状态码' },
            // { path: '/echarts-topIP', component: topBrowser, name: 'topBrowser' },
            { path: '/echarts-topIP2', component: topBrowser2, name: '浏览器占比' },
            { path: '/echarts-pvuv', component: pvuv, name: '活跃度与用户量'},
            { path: '/topIP', component: topIP, name: 'Top访问量IP'},
            // { path: '/uv', component: uv, name: 'uv'},
            { path: '/map', component: map, name: '访问分布图'},
            { path: '/response-time', component: response, name: '重要访问页'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

// export default routes;
