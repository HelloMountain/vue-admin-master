<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="32">
                <el-form :inline="true" :model="filters">
                    <el-form-item>
                        <el-input v-model="filters.ip" placeholder="IP"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="getAddr">IP地址查询</el-button>
                    </el-form-item>
                </el-form>
                <div id="chartColumn" style="width:100%; height:400px;" v-loading="ipLoading"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts';
    import { getTopIp, getAddr } from '../../api/api';

    export default {
        data() {
            return {
                chartColumn: null,
                ipLoading: false,
                filters: {
                    name: ''
                },
                test: null
            }
        },

        methods: {
            getAddr: function(){
                let para = {
                    ip : this.filters.ip
                };
                if (para.ip === undefined){
                    alert("您查询的ip为空");
                    return;
                }else {
                    getAddr(para).then((res) => {
                        this.test = res.data;
                        if (res.data.code !== 200){
                            alert("查询IP失败");
                        } else {
                            alert("您查询的ip位于 "  + res.data.data[0] + " : " +res.data.data[1]);
                            return res.data.data;
                        }
                    });
                }
            },
            getMydata: async function(){
                // this.ipLoading = true;
                let data = await getTopIp().then((res) => {
                    this.mydata = res.data.data;
                    return res.data.data;
                    // this.ipLoading = false;
                });
                // console.log(data.valueOf());
                return data;
            },
            async drawColumnChart() {
                let dataAxis = [ 'chrome', 'Firefox', 'IE', 'Opera', 'Safari', 'Maxthon', 'RockMelt', 'SeaMonkey','DE','AB'];
                let data = await this.getMydata();
                // console.log(data[0]);
                // 在用到mydata的时候才会调用get
                // this.ipLoading = true;
                // console.log(data);
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                    title : {
                        text: '访问服务器TOP IP',
                        subtext: ''
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        // data:['2011年', '2012年']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'value',
                            boundaryGap : [0, 0.01]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
                            // data : [data[0],'印尼','美国','印度','中国','世界人口(万)']
                            data : [data[0],data[2],data[4],data[6],data[8]]
                        }
                    ],
                    series : [
                        {
                            // name:'2011年',
                            name:'累计次数',
                            type:'bar',
                            // data:[18203, 23489, 29034, 104970, 131744, 630230]
                            data:[data[1], data[3], data[5], data[7], data[9]]
                         }
                    ]
                });
            },
            drawCharts() {
                // this.getMydata();
                this.drawColumnChart()
            },
        },

        mounted: function () {
            this.drawCharts();
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
