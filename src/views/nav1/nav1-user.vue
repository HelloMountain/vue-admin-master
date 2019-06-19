<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="服务器名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getServerByName">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
				<el-table :data="servers" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="id" label="ID" width="80" sortable>
				</el-table-column>
				<el-table-column prop="name" label="服务器名" width="120" sortable>
				</el-table-column>
				<el-table-column prop="host" label="主机" width="100"sortable>
				</el-table-column>
				<el-table-column prop="logPath" label="日志地址" width="120" sortable>
				</el-table-column>
				<el-table-column prop="createdAt" label="创建时间" width="120" :formatter="formatCreateTime" sortable>
				</el-table-column>
				<el-table-column prop="updatedAt" label="更新时间" width="120" :formatter="formatUpdateTime" sortable>
				</el-table-column>
				<el-table-column prop="published" label="是否运行" width="120" :formatter="formatSex" sortable>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
    import util from '../../common/js/util'
    import {getServerLikeName, getServerListPage} from '../../api/api';
    //import NProgress from 'nprogress'  //进度条
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				// users: [
				servers: [
				]
			}
		},
		methods: {

            //时间转换
            formatUpdateTime: function (row, column) {
                return util.formatDate.format(new Date(row.updatedAt), 'yyyy-MM-dd')
            },
            formatCreateTime: function (row, column) {
                return util.formatDate.format(new Date(row.createdAt), 'yyyy-MM-dd')
            },
			//性别显示转换
			formatSex: function (row, column) {
                return row.published == true ? '是' : row.published == false ? '否' : '否';
            },
			//通过名字模糊查询
			getServerByName: function (){
              let para = {
                  name: this.filters.name,
			  };
			  this.loading = true;
			  getServerLikeName(para).then((res)=>{
			      this.servers = res.data.data;
			      this.loading = false;
			  });
			},
			//获取用户列表
			getUser: function () {
			    // alert(sessionStorage.getItem("name"));
			    //在javascript中我们通常使用var会发生变量提升，
				// 即脚本开始运行时，变量已经存在了，但是没有值，所以会输出undefined，
                //而let不会发生变量提升,这表示在声明它之前，变量是不存在的，这时如果用到它，就会抛出一个错误
				let para = {
					// name: this.filters.name,
				};
				this.loading = true;
				// alert(para.name);
				//NProgress.start();
				getServerListPage(para).then((res) => {
                    this.servers = res.data.data;
                    this.loading = false;
                    //NProgress.done();
                });
				//
				// getUserList(para).then((res) => {
				//     alert("2222");
				// 	this.servers = res.data.users;
				// 	this.loading = false;
				// 	//NProgress.done();
				// });
			}
		},
		mounted() {
			this.getUser();
		}
	};

</script>

<style scoped>

</style>
