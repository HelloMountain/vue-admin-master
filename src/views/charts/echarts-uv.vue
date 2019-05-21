<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="32">
                <div id="chartColumn" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'

    export default {
        data() {
            return {
                chartColumn: null
            }
        },

        methods: {
            drawColumnChart() {
                let dataAxis = [ 'chrome', 'Firefox', 'IE', 'Opera', 'Safari', 'Maxthon', 'RockMelt', 'SeaMonkey','DE','AB'];
                let data = [500, 450, 400, 390, 350, 310, 323, 282, 251, 230];
                let yMax = 500;
                let dataShadow = [];
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption( {    title : {
                        text : '时间坐标折线图',
                        subtext : 'dataZoom支持'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter : function (params) {
                            var date = new Date(params.value[0]);
                            data = date.getFullYear() + '-'
                                + (date.getMonth() + 1) + '-'
                                + date.getDate() + ' '
                                + date.getHours() + ':'
                                + date.getMinutes();
                            return data + '<br/>'
                                + params.value[1] + ', '
                                + params.value[2];
                        }
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    dataZoom: {
                        show: true,
                        start : 70
                    },
                    legend : {
                        data : ['series1']
                    },
                    grid: {
                        y2: 80
                    },
                    xAxis : [
                        {
                            type : 'time',
                            splitNumber:10
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name: 'series1',
                            type: 'line',
                            showAllSymbol: true,
                            symbolSize: function (value){
                                return Math.round(value[2]/10) + 2;
                            },
                            data: (function () {
                                var d = [];
                                var len = 0;
                                var now = new Date();
                                var value;
                                while (len++ < 200) {
                                    d.push([
                                        new Date(2014, 9, 1, 0, len * 10000),
                                        (Math.random()*30).toFixed(2) - 0,//圆圈的纵坐标
                                        (Math.random()*100).toFixed(2) - 0//圆圈的半径
                                    ]);
                                    console.log(new Date(2014, 9, 1, 0, len * 10000));
                                }
                                return d;
                            })()
                        }
                    ]
                }
                )
            },
            drawCharts() {
                this.drawColumnChart()
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
