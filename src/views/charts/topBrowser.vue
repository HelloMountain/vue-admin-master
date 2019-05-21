<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="32">
                <div id="chartColumn" style="width:100%; height:400px;" v-loading="ipLoading"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts';
    import { getCode } from '../../api/api';

    export default {
        data() {
            return {

                mydata: null,
                chartColumn: null,
                ipLoading: false
            }
        },

        methods: {
            getMydata: async function(){
                // this.ipLoading = true;
                let data = await getCode().then((res) => {
                    // alert("1");
                    this.mydata = res.data.data;
                    console.log(this.mydata[0]);
                    return res.data.data;
                    // this.ipLoading = false;
                });
                return data;
            },
            async drawColumnChart() {
                let dataAxis = [ 'chrome', 'Firefox', 'IE', 'Opera', 'Safari', 'Maxthon', 'RockMelt', 'SeaMonkey','DE','AB'];
                let data = [500, 450, 400, 390, 350, 310, 323, 282, 251, 230];
                // alert("2");
                // 在用到mydata的时候才会调用get
                // this.ipLoading = true;
                data = await this.getMydata();
                // alert("3");
                console.log(data);
                let yMax = 500;
                let dataShadow = [];
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                  title: { text: '用户浏览器TOP 10', subtext: '',
                  },
                  tooltip: {},
                    xAxis: {
                        data: dataAxis,
                        axisLabel: {
                            inside: true,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        z: 10
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#999'
                            }
                        }
                    },
                    dataZoom: [
                        {
                            type: 'inside'
                        }
                    ],
                    series: [
                        { // For shadow
                            type: 'bar',
                            itemStyle: {
                                normal: {color: 'rgba(0,0,0,0.05)'}
                            },
                            barGap:'-100%',
                            barCategoryGap:'40%',
                            data: dataShadow,
                            animation: false
                        },
                        {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                            data: data
                            // data: this.mydata
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
