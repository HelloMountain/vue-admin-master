<template>
    <div class="echarts">
        <div :style="{height:'450px',width:'100%'}" ref="myEchart"></div>
    </div>
</template>
<script>
    import echarts from "echarts";
    //   import '../../node_modules/echarts/map/js/world.js'
    import 'C:/Users/qingshan/Downloads/vue-admin-master/static/china.js' // 引入中国地图数据
    import {getMap}from '../../api/api';

    export default {
        name: "echarts",
        props: ["userJson"],
        data() {
            return {
                chart: null
            };
        },
        mounted() {
            this.chinaConfigure();
        },
        beforeDestroy() {
            if (!this.chart) {
                return;
            }
            this.chart.dispose();
            this.chart = null;
        },
        methods: {
            getData: async function(){
                let a = await getMap().then((res)=>{
                    return res.data.data;
                });
                return a;
            },
            async chinaConfigure() {
                let charts = await this.getData();
                // console.log(charts);
                // console.log(charts);
                let data = [];
                for (let mapKey in charts) {
                    let temp = {"name":mapKey, "value":charts[mapKey]};
                    data.push(temp);
                }
                let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
                window.onresize = myChart.resize;
                myChart.setOption({ // 进行相关配置
                    backgroundColor: "#45b1db",
                    title: {
                        text: '访问分布图',
                        subtext: '',
                        x: 'center'},
                    tooltip: {
                    }, // 鼠标移到图里面的浮动提示框
                    dataRange: {
                        show: false,
                        min: 0,
                        max: 1000,
                        text: ['High', 'Low'],
                        realtime: true,
                        calculable: true,
                        color: ['orangered', 'yellow', 'lightskyblue']
                    },
                    geo: { // 这个是重点配置区
                        map: 'china', // 表示中国地图
                        roam: true,
                        label: {
                            normal: {
                                show: true, // 是否显示对应地名
                                textStyle: {
                                    color: 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(0, 0, 0, 0.2)'
                            },
                            emphasis: {
                                areaColor: null,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    series: [{
                        type: 'scatter',
                        coordinateSystem: 'geo' // 对应上方配置
                    },
                        {
                            name: '启动次数', // 浮动框的标题
                            type: 'map',
                            geoIndex: 0,
                            data: data
                        }
                    ]
                })
            }
        }
    }
</script>
