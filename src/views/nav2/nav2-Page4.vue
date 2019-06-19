<template>
  <div>
    <h1>日志收集客户端的安装引导</h1>
    <!--Clicked: {{ getCount }} times-->
    <!--<button @click="increment">+</button>-->
    <!--<button @click="decrement">-</button>-->
    <!--<h3>请将以下命令复制，然后在命令行中执行</h3>-->
    <!--<div id="vue_det">-->
      <!--<h1>{{details()}}</h1>-->
    <!--</div>-->
    <section class="chart-container">
      <el-row>
        <h4>1.输入新增服务器时生成的服务器 ID</h4>
        <el-col :span="32">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input v-model="filters.id" placeholder="ID"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="myMethods">确认</el-button>
            </el-form-item>
          </el-form>
          <div id="chartColumn" style="width:100%; height:20px;" v-loading="ipLoading"></div>
        </el-col>
      </el-row>
    </section>
    <h3>请复制以下命令，在安装客户端的服务器上执行</h3>

    2.获取安装脚本： <h3>curl -o /tmp/install.sh -L 192.168.43.234:8081/api/sh?ID={{this.id}}</h3>
    3.为安装脚本赋予权限：<h3>sudo chmod +x /tmp/install.sh</h3>
    4.执行安装脚本，安装客户端： <h3>sudo /tmp/install.sh</h3>


    <span class="leader">{{this.chartColumn}}</span>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import {getLeaderMessage, getServerById} from '../../api/api';


  export default {
      data() {
          return {
              site: "菜鸟教程",
              url: "www.runoob.com",
              alexa: "10000",
              // chartColumn: aaa,
              chartBar: null,
              chartLine: null,
              chartPie: null,
              chartColumn: null,
              ipLoading: false,
              filters: {
                  name: ''
              },
              test: null,
              id:null
          }
      },
      computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
    },
    methods: {
        myMethods(){
            let exp = this.filters.id;
            if (!isNaN(Number(exp))){
                //判断是否存在该服务器
                let para = {
                    id: this.filters.id
                };
                getServerById(para).then((res) =>{
                    if (res.data.data === null){
                        alert('不存在此服务器ID');
                        this.id = null;
                    }else {
                        this.id = res.data.data.id;
                    }
                    console.log(res.data.data);
                });
                //修改命令行的参数
                console.log(this.filters.id)
            } else {
                alert('ID输入有误');
            }
        },
        details: function() {

            return  " - 学的不仅是技术，更是梦想！";
        },
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
      'decrement'
    ])
      //...mapActions({
      //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
      //})
    }
  }

</script>
