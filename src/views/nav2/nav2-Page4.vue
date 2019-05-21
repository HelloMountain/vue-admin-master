<template>
  <div>
    <h1>客户端安装引导</h1>
    <!--Clicked: {{ getCount }} times-->
    <!--<button @click="increment">+</button>-->
    <!--<button @click="decrement">-</button>-->
    <!--<h3>请将以下命令复制，然后在命令行中执行</h3>-->
    <!--<div id="vue_det">-->
      <!--<h1>{{details()}}</h1>-->
    <!--</div>-->
    <h3>请复制以下命令，在安装客户端的服务器上执行</h3>

    1.获取安装脚本： <h3>curl -o /tmp/install.sh -L 10.241.150.159:8081/api/test/sh</h3>
    2.为安装脚本赋予权限：<h3>sudo chmod +x /tmp/install.sh</h3>
    3.执行安装脚本，安装客户端： <h3>sudo /tmp/install.sh</h3>


    <span class="leader">{{this.chartColumn}}</span>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import {getLeaderMessage} from '../../api/api';


  export default {
      data() {
          return {
              site: "菜鸟教程",
              url: "www.runoob.com",
              alexa: "10000",
              chartColumn: aaa,
              chartBar: null,
              chartLine: null,
              chartPie: null
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
