import NotFound from "./views/404";

// 菜单一：管理信息
let item1 = {
  index: 'sales',
  title: '菜单一',
  icon: '/static/images/money.png',
  subs: [
    {
      index: '/menu1_item1',
      title: '选项1'
    },
    {
      index: '/menu1_item2',
      title: '选项2'
    }
  ]
}
//菜单二：引导界面
let item2 = {
  index: '',
  title: '菜单二',
  icon: '/static/images/analysis.png',
  subs: [
    {
      index: '/menu2_item1',
      title: '选项1'
    },
    {
      index: '/menu2_item2',
      title: '选项2'
    },
    {
      index: '/menu2_item3',
      title: '选项3'
    }
  ]
}
//菜单三：可视化
let item3 = {
  index: 'mm',
  title: '菜单三',
  icon: '/static/images/checklist.png',
  subs: [
    {
      index: '/menu3_item1',
      title: '选项1'
    },
    {
      index: '/menu3_item2',
      title: '选项2'
    },
    {
      index: '/menu3_item3',
      title: '选项3'
    }
  ]
}

//路由信息
let routerData = {
  path: '/',
  name: 'main',
  component: "dashboard",
  children: [
    {
      path: 'menu1_item1',
      component: "menu1_item1",
      name: 'menu1_item1'
    },
    {
      path: 'menu1_item2',
      component: "menu1_item2",
      name: 'menu1_item2'
    }
  ]
}

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
let navData = [item1, item2, item3, item4]
module.exports = {
  navData: navData,
  routerData: [routerData]
}
