<template>
    <section class="chart-container">
        <br/>
              <img src="../../assets/browser.jpg"/>
        <br/>
        <h3>主要关注占比高的浏览器的用户体验</h3>

        <el-row>
            <el-col :span="32">
                <div id="chartPie" style="width:100%; height:400px;" v-loading="ipLoading"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts';
    import { getBrowser } from '../../api/api';

    export default {
        data() {
            return {

                mydata: null,
                chartColumn: null,
                ipLoading: false
            }
        },

        methods: {
            getMydata: function(){
                // this.ipLoading = true;
                let data =  getBrowser().then((res) => {
                    // alert("1");
                    this.mydata = res.data.data;
                    this.drawPieChart();
                    return res.data.data;
                    // this.ipLoading = false;
                });
                return data;
            },
            drawPieChart() {
                console.log(this.mydata);
                console.log(this.mydata[0].browser);
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: '用户使用浏览器占比',
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
                        data: [this.mydata[0].browser, this.mydata[0].browser, this.mydata[0].browser, this.mydata[0].browser, this.mydata[0].browser]
                    },
                    series: [
                        {
                            name: '状态码',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                { value: this.mydata[0].num, name: this.mydata[0].browser },
                                { value: this.mydata[0].num, name: this.mydata[0].browser },
                                { value: this.mydata[0].num, name: this.mydata[0].browser },
                                { value: this.mydata[0].num, name: this.mydata[0].browser },
                                { value: this.mydata[0].num, name: this.mydata[0].browser }
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
                this.getMydata();
                // this.drawColumnChart()
            },
        },
        start: function(){
                let _this=this.setTimeout(function (){
                var _ZR = this.chartColumn.getZrender();
                // var TextShape = require('zrender/shape/Text');
                    log(_ZR)
                // 补充千层饼
                _ZR.addShape(new this.chartColumn.graphic.Text({
                    style : {
                        x : _ZR.getWidth() / 2,
                        y : _ZR.getHeight() / 2,
                        color: '#666',
                        text : '恶梦的过去',
                        textAlign : 'center'
                    }
                }));
                _ZR.addShape(new this.chartColumn.graphic.Text({
                    style : {
                        x : _ZR.getWidth() / 2 + 200,
                        y : _ZR.getHeight() / 2,
                        brushType:'fill',
                        color: 'orange',
                        text : '美好的未来',
                        textAlign : 'left',
                        textFont:'normal 20px 微软雅黑'
                    }
                }));
                _ZR.refresh();
            }, 2000)
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
