<template>
    <section class="chart-container">
        <br/>
        <img src="../../assets/code.png"/>
        <br/>
        <h3>通过状态码来判断服务器整体的健康状态，4**/5**状态码比重过大为健康较差，1**/2**/3**比重越大为越健康</h3>
        <el-row>
            <el-col :span="22">
                <div id="chartPie" style="width:100%; height:500px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import { getDataCode } from '../../api/api';
    import echarts from 'echarts';

    export default {
        data() {
            return {
                chartPie: null,
                data1: null,
                data2: null,
                imgUrl: require("../../assets/code.png")
            }
        },

        methods: {
            // getData: async function(){
            //     let a =  await getDataCode().then((res) => {
            //         this.mydata = res.data.data;
            //         this.data1 = [this.mydata[0], this.mydata[0], this.mydata[0], this.mydata[0], this.mydata[0]];
            //
            //         return res.data.data;
            //     });
            //     return a;
            // },
            getData:  function(){
                let a =  getDataCode().then((res) => {
                    this.data1 = res.data.data;
                    this.drawPieChart();
                    return res.data.data;
                });
                return a;
            },
            drawPieChart() {
                let data1 = [this.data1[0], this.data1[2], this.data1[4], this.data1[6], this.data1[8]];
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: '网站状态码',
                        subtext: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        // data: ['200', '404', '503', '304', '400']
                        // data: [this.mydata[1], this.mydata[2], this.mydata[4], this.mydata[6], this.mydata[8]]
                        data: data1
                    },
                    series: [
                        {
                            name: '状态码',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                // { value: data[1], name: data[0] },
                                // { value: data[3], name: data[2] },
                                // { value: data[5], name: data[4] },
                                // { value: data[7], name: data[6] },
                                // { value: data[9], name: data[8] }
                                { value: this.data1[1], name: this.data1[0] },
                                { value: this.data1[3], name: this.data1[2] },
                                { value: this.data1[5], name: this.data1[4] },
                                { value: this.data1[7], name: this.data1[6] },
                                { value: this.data1[9], name: this.data1[8] }
                            ],
                            // data: this.mydata,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            drawCharts() {
                // this.drawPieChart()
                this.getData()
            },
        },

        mounted: function () {
            this.drawCharts()
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
