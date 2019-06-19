<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:40%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <el-button type="primary" style="width:40%;" @click.native.prevent="handleReset2" :loading="logining">重置</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import { requestLogin } from '../api/api';
  import { getDefault }from '../api/api';
  import { mapActions } from 'vuex'

  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
          routeData: [],
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
        ...mapActions({add_Routes: 'add_Routes'}),
      handleReset2() {
        // this.$refs.ruleForm2.resetFields();
        this.ruleForm2.account = '';
        this.ruleForm2.checkPass = '';
      },
        handleDefault(){
            getDefault().then((res) => {
                alert(res.data.message);
            });
        },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            // _this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              //NProgress.done();
              // let { msg, code, user } = data;
              let msg = data.message;
              let code = data.code;
              let user = data.data;
              console.log(user);
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else if(!user.published){
                  this.$message({
                      message: "您的访问权限被取消，请联系管理员",
                      type: 'error'
                  });
              }
                else {

                  // if(data.data.role === 'user'){
                  //     // 将路由信息，菜单信息，用户信息存到sessionStorage里
                  //     sessionStorage.setItem('menuData', JSON.stringify(res.data.navData))
                  //     sessionStorage.setItem('user', this.user.username)
                  //     sessionStorage.setItem('routes', JSON.stringify(res.data.routerData))
                  // }
                  // else if (data.data.role === 'admin'){
                  //     // 将路由信息，菜单信息，用户信息存到sessionStorage里
                  //     sessionStorage.setItem('menuData', JSON.stringify(res.data.navData))
                  //     sessionStorage.setItem('user', this.user.username)
                  //     sessionStorage.setItem('routes', JSON.stringify(res.data.routerData))
                  // }
                  // this.add_Routes(res.data.routerData) //触发vuex里的增加路由

                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('role', JSON.stringify(user.role));

                  // { path: '/main', component: Main, name: '主页', hidden: true },
                  // { path: '/table', component: Table, name: 'User' },
                let adminData = [
                    {
                        path: '/',
                        component: 'Home',
                        name: '安装引导',
                        iconCls: 'fa fa-id-card-o',
                        children: [
                            { path: '/page4', component: 'nav2-Page4', name: '收集客户端安装' },
                        ]
                    },
                    {
                        path: '/',
                        component: 'Home',
                        name: '分析数据及可视化    ',
                        iconCls: 'fa fa-bar-chart',
                        children: [
                            { path: '/echarts', component: 'charts-code', name: '网站状态码' },
                            { path: '/echarts-topIP2', component: 'charts-topBrowser2', name: '浏览器占比' },
                            { path: '/echarts-pvuv', component: 'charts-vPU', name: '活跃度与用户量'},
                            { path: '/topIP', component: 'charts-topIP', name: 'Top访问量IP'},
                            { path: '/map', component: 'charts-map', name: '访问分布图'},
                            {
                                path: '/response-time',
                                component: 'charts-Responsetime',
                                name: '重要访问页',
                                children: [
                                    { path: '/echarts', component: 'charts-code', name: '网站状态码' }
                                ]
                            }
                        ]
                    },
                    {
                        path: '/',
                        component: 'Home',
                        name: '系统管理信息',
                        iconCls: 'el-icon-message',//图标样式class
                        children: [
                            { path: '/main', component: 'Main', name: '主页', hidden: true },
                            { path: '/table', component: 'nav1-Table', name: '用户信息' },
                            { path: '/tableuser', component: 'nav1-TableServer', name: '服务器信息' },
                            // { path: '/user', component: 'nav1-user', name: '列表' }
                            // { path: '/privilege', component: 'nav1-privilege', name: '权限' }
                        ]
                    },
                    {
                        path: '*',
                        hidden: true,
                        redirect: { path: '/404' }
                    }
                  ];

                  let userData = [
                      {
                          path: '/',
                          component: 'Home',
                          name: '安装引导',
                          iconCls: 'fa fa-id-card-o',
                          children: [
                              { path: '/page4', component: 'nav2-Page4', name: '收集客户端安装' },
                          ]
                      },
                      {
                          path: '/',
                          component: 'Home',
                          name: '分析数据及可视化    ',
                          iconCls: 'fa fa-bar-chart',
                          children: [
                              { path: '/echarts', component: 'charts-code', name: '网站状态码' },
                              // { path: '/echarts-topIP', component: topBrowser, name: 'topBrowser' },
                              { path: '/echarts-topIP2', component: 'charts-topBrowser2', name: '浏览器占比' },
                              { path: '/echarts-pvuv', component: 'charts-vPU', name: '活跃度与用户量'},
                              { path: '/topIP', component: 'charts-topIP', name: 'Top访问量IP'},
                              // { path: '/uv', component: uv, name: 'uv'},
                              { path: '/map', component: 'charts-map', name: '访问分布图'},
                              {
                                  path: '/response-time',
                                  component: 'charts-Responsetime',
                                  name: '重要访问页',
                                  children: [
                                      { path: '/echarts', component: 'charts-code', name: '网站状态码' }
                                  ]
                              }
                          ]
                      },
                      {
                          path: '/',
                          name: '管理信息',
                          component: 'Home',
                          iconCls: 'el-icon-message',//图标样式class
                          children: [
                              { path: '/main', component: 'Main', name: '主页', hidden: true },
                              // { path: '/table', component: 'nav1-Table', name: '用户信息' },
                              // { path: '/tableuser', component: 'nav1-TableServer', name: '服务器信息' },
                              { path: '/user', component: 'nav1-user', name: '服务器信息' },
                              { path: '/selftable', component: 'nav1-SelfTable', name: '个人信息' },
                              // { path: '/privilege', component: 'nav1-privilege', name: '权限' }
                          ]
                      },
                      {
                          path: '*',
                          hidden: true,
                          redirect: { path: '/404' }
                      }
                  ];
                  // this.routerData = require('../router/admin_data');
                  // console.log(user.role == 'user');
                  // console.log(user.role == 'user');
                  if (user.role === 'admin'){
                      this.routerData = adminData;
                  } else {
                      this.routerData = userData;
                  }
                  // console.log(this.routerData);
                  // let test = JSON.stringify(userData);
                  sessionStorage.setItem('routes', JSON.stringify(this.routerData));
                  // console.log(10);
                  // console.log(JSON.parse(sessionStorage.getItem('routes')));
                this.add_Routes(this.routerData); //触发vuex里的增加路由
                this.$router.push({ path: '/echarts' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
