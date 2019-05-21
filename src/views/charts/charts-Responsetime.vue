<!--不同时间段 网站流量https://echarts.baidu.com/echarts2/doc/example/line8.html#macarons-->
<!--某一天按小时网站流量 https://echarts.baidu.com/echarts2/doc/example/bar14.html-->


<template>
    <section class="chart-container">
        <el-row>
            <h3>
                “2-5-10原则”:<br/>
                当用户在2秒以内得到响应时，会感觉系统的响应很快；<br/>
                当用户在2-5秒之间得到响应时，会感觉系统的响应速度还可以；<br/>
                当用户在5-10秒以内得到响应时，会感觉系统的响应速度很慢，但是还可以接受；<br/>
                而当用户在超过8秒后仍然无法得到响应时，会感觉系统糟透了，或者认为系统已经失去响应，而选择离开这个Web站点，或者发起第二次请求。<br/>
                建议时间：2秒~首页，5秒~普通页面，10秒~复杂查询页面。</h3>
            <el-col :span="22">
                <!--响应时间url-->
                <div id="chartBar1" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="22">
                <h3>
                    开发人员应当尽量保证访问次数最多的页面的质量，从而给用户最大的使用体验；<br/>
                    当访问的页面的次数大于访问的最大阈值，应当加以次数限制，避免服务器崩溃；
                </h3>
                <!--访问次数url-->
                <div id="chartBar2" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="22">
                <h3>及时解决响应错误页面中出现的问题;</h3>
                <!--错误url-->
                <div id="chartBar3" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import { getResponseTime, getTopUrl, getErrorUrl } from '../../api/api'

    export default {
        data() {
            return {
                chartBar1: null,
                chartBar2: null,
                chartBar3: null,
                bar1data: null,
                bar2data: null,
                bar3data: null
            }
        },

        methods: {
            getResponse(){
              let a = getResponseTime().then((res) => {
                  this.bar1data = res.data.data;
                  this.drawBarChart1();
                  return res.data.data;
              });
                return a;
            },
            getTopUrl(){
                let a = getTopUrl().then((res) => {
                    this.bar2data = res.data.data;
                    // console.log(res.data.data);
                    this.drawBarChart2();
                    return res.data.data;
                });
                return a;
            },
            getErrorUrl(){
                let a = getErrorUrl().then((res) => {
                    this.bar3data = res.data.data;
                    console.log(res.data.data);
                    this.drawBarChart3();
                    return res.data.data;
                });
                return a;
            },
            getData(){
                // let a =  getDataCode().then((res) => {
                //     this.mydata = res.data.data;
                //     this.data1 = [this.mydata[0], this.mydata[0], this.mydata[0], this.mydata[0], this.mydata[0]];
                //
                //     return res.data.data;
                // });
                // return a;
                this.getResponse();
                this.getTopUrl();
                this.getErrorUrl();
            },
            drawBarChart1() {
                this.chartBar1 = echarts.init(document.getElementById('chartBar1'));
                this.chartBar1.setOption({
                    title: {
                        text: '响应时间',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['2012年']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        boundaryGap: [0, 0.01]
                    }],
                    yAxis: [{
                        type: 'category',
                        // data: [this.bar1data[0].url, '印尼', '美国', '印度', '中国', '世界人口(万)']
                        data: [this.bar1data[0].url, this.bar1data[1].url, this.bar1data[2].url,
                            this.bar1data[3].url, this.bar1data[4].url, this.bar1data[5].url,this.bar1data[6].url,
                            this.bar1data[7].url,this.bar1data[8].url,this.bar1data[8].url]
                    }],
                    series: [
                        {
                            name: '2011年',
                            type: 'bar',
                            data: [this.bar1data[0].responsetime, this.bar1data[1].responsetime, this.bar1data[2].responsetime,
                                this.bar1data[3].responsetime, this.bar1data[4].responsetime, this.bar1data[5].responsetime,
                                this.bar1data[6].responsetime,this.bar1data[7].responsetime,this.bar1data[8].responsetime,
                                this.bar1data[9].responsetime]
                        }
                    ]
                });
            },
            drawBarChart2() {
                this.chartBar2 = echarts.init(document.getElementById('chartBar2'));
                this.chartBar2.setOption({
                    title: {
                        text: '访问最多',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['2012年']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '30%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: [this.bar2data[0].url, this.bar2data[1].url, this.bar2data[2].url, this.bar2data[3].url,this.bar2data[4].url]
                    },
                    series: [
                        {
                            name: '2011年',
                            type: 'bar',
                            data: [this.bar2data[0].num, this.bar2data[1].num, this.bar2data[2].num, this.bar2data[3].num, this.bar2data[4].num]
                        }
                    ]
                });
            },
            drawBarChart3() {
                console.log(this.bar3data);
                this.chartBar3 = echarts.init(document.getElementById('chartBar3'));
                this.chartBar3.setOption({
                    title: {
                        text: '错误页面',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['2012年']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '30%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        // data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
                        data: [this.bar3data[0].url, this.bar3data[1].url, this.bar3data[2].url]
                    },
                    series: [
                        {
                            name: '2011年',
                            type: 'bar',
                            data: [this.bar3data[0].num, this.bar3data[1].num, this.bar3data[2].num]
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawBarChart1();
                this.drawBarChart2();
                this.drawBarChart3();
            },
        },

        mounted: function () {
            // this.drawCharts()
            this.getData()
        },
        updated: function () {
            this.getData()
            // this.drawCharts()
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
