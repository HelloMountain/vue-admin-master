<template>
    <section>
        <br/>
        <h2>PV：即Page View，网站浏览量，指一天内页面的浏览次数，用于衡量网站用户访问的网页数量</h2>
        <h2>UV：即Unique Visitor，独立访客数，指一天内访问某站点的人数</h2>
        <h3>选择您要查询的日期:</h3>
        <div class="zss-date-picker">
            <input class="zss-date-input" type="text" placeholder="请选择日期" readonly v-model="currentValue" @focus="inputFocus" />
            <transition name="fade">
                <div class="zss-picker-model" @click.self="modelClick" v-show="isShow" :style="{'z-index':zIndex}">
                    <div class="zss-panel">
                        <!-- header -->
                        <div class="zss-panel-header">
                            <div class="zss-date-year">
                                <div class="zss-date-prev zss-text-disabled" v-if="select=='year'">＜</div>
                                <div class="zss-date-prev zss-text-hover" v-else @click="prevYear">＜</div>
                                <div class="zss-date-text zss-text-hover" @click="select='year'">{{firstDate[0]}}</div>
                                <div class="zss-date-next zss-text-disabled" v-if="select =='year'">＞</div>
                                <div class="zss-date-next zss-text-hover" v-else @click="nextYear">＞</div>
                            </div>
                            <div class="zss-date-month">

                                <div class="zss-date-prev zss-text-hover" @click="prevMonth">＜</div>
                                <div class="zss-date-text zss-text-hover" @click="select='month'">{{firstDate[1]}}</div>
                                <div class="zss-date-next zss-text-hover" @click="nextMonth">＞</div>
                            </div>
                        </div>
                        <!-- /header -->

                        <div class="zss-panel-body">
                            <!-- 年 -->
                            <div class="zss-year-box" v-show="select=='year'">
                                <div class="zss-year" v-for="item in yearList" @click="clickYear(item)">{{item}}</div>
                            </div>
                            <div class="zss-year-control" v-show="select=='year'">
                                <div class="zss-control-prev" @click="prevYears">＜</div>
                                <div class="zss-control-next" @click="nextYears">＞</div>
                            </div>
                            <!-- /年 -->
                            <!--月-->
                            <div class="zss-month-box" v-show="select=='month'">
                                <div class="zss-month" v-for="(item,index) in monthArray" @click="clickMonth(index)">{{item}}</div>
                            </div>
                            <!--/月-->
                            <!-- 周标题 -->
                            <div class="zss-date-week" v-show="select=='date'">
                                <div class="zss-week" v-for="item in weekArray">{{item}}</div>
                            </div>
                            <!-- /周标题 -->
                            <!-- 日期-->
                            <div class="zss-date-box" v-show="select=='date'">
                                <div class="zss-date" :class="{'zss-date-now':isNow(item),'zss-month-now':isMonth(item)}" v-for="item in dateArray" @click="clickDate(item)">{{item[2]}}</div>
                            </div>
                            <!--/日期-->
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div>
            <el-row>
                <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <el-form :inline="true" :model="filters">
                        <el-form-item>
                            <el-button type="primary" @click="getPUV">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-row>
                <el-col :span="22">
                    <div id="chartPie" style="width:100%; height:500px;"></div>
                </el-col>
            </el-row>
        </div>
    </section>
</template>
<script>
    import momnet from 'moment'
    import echarts from 'echarts'
    import { getPUV } from '../../api/api';
    export default {
        props:{
            value:{
                type:String,
                default:'2019-06-01' //生日 联系我可＋QQ:503305196
            }
        },
        data(){
            return {
                pvData: null,
                uvData: null,
                filters: {
                    name: ''
                },
                currentValue:'', //当前值
                zIndex:-1,
                isShow:false,
                select:'date',
                weekArray:['日','一','二','三','四','五','六'],
                monthArray:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                currentDate:[], //当前日期
                dateArray:[],  //当月日期列表
                firstDate:[],  //当月1号
                yearList:[] //当前年列表
            }
        },
        mounted(){
            this.initData();
            this.getPUV();
            // this.drawCharts()
        },
        methods:{
            getPUV:  function(){
                let para = {
                    date: this.currentValue,
                };
                let data = getPUV(para).then((res) => {
                    this.uvData = res.data.data.uvNum;
                    this.pvData = res.data.data.pvNum;
                    this.drawPieChart();
                    return res.data.data;
                });
                return data;
            },
            drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: 'PV/UV',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['PV', 'UV']
                    },
                    grid: {
                        left: '3%',//距离左边多远
                        right: '4%',//距离右边多远
                        bottom: '60%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['PV&UV']
                    },
                    series: [
                        {
                            name: 'PV',
                            type: 'bar',
                            data: [ this.pvData]
                        },
                        {
                            name: 'UV',
                            type: 'bar',
                            data: [this.uvData]
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawPieChart()
            },

            //初始化值
            initData(){
                this.currentValue = this.value;
                this.currentDate = (this.value||momnet().format('YYYY-MM-DD')).split('-');
                this.firstDate = momnet(this.currentDate.join('-')).startOf('month').format('YYYY-MM-DD').split('-');
                this.getDateArray();
                this.getYearArray();
                this.getIndex();
            },
            //获取当前页面的最大Index
            getIndex(){
                let zIndex = -1;
                let array = [...document.all];
                for(let i = 0; i < array.length; i++){
                    let index = window.getComputedStyle(array[i], null).zIndex;
                    if(index!='auto'&& index > zIndex){
                        zIndex =  parseInt(index);
                    }
                }
                this.zIndex = zIndex+1;
            },
            //获取当前显示日期列表
            getDateArray(){
                let day = momnet(this.firstDate.join('-')).day(); //1号是周几
                let list = []
                for(var i = 0; i < 42; i++){
                    let date = null;
                    if(day == 0){
                        date = momnet(this.firstDate.join('-')).add((i-7),'days');
                    }else{
                        date = momnet(this.firstDate.join('-')).add((i-day),'days');
                    }
                    list.push(date.format('YYYY-MM-DD').split('-'));
                }
                this.dateArray = list;
            },
            //获取当前年列表
            getYearArray(){
                let year = this.firstDate[0];
                let yearList = [];
                for(let i = 0; i < 15; i++){
                    yearList.push(year-7+i);
                }
                this.yearList = yearList;
            },
            //获取焦点
            inputFocus(){
                this.initData();
                this.isShow = true;
            },
            //点击遮罩层
            modelClick(){
                this.isShow = false;
            },
            //获取当前日期
            clickDate(item){
                let date = item.join('-');
                this.currentValue = date;
                this.$emit('input',date);
                this.isShow = false;
            },
            //判断是否是当天
            isNow(item){
                if(this.firstDate[1] != this.currentDate[1]){
                    return false;
                }
                if(item[0] != this.currentDate[0]){
                    return false;
                }
                if(item[1] != this.currentDate[1]){
                    return false;
                }
                if(item[2] != this.currentDate[2]){
                    return false;
                }
                return true;
            },
            //判断是否当月
            isMonth(item){
                if(item[0] != this.firstDate[0]){
                    return false;
                }
                if(item[1] != this.firstDate[1]){
                    return false;
                }
                return true;
            },
            //点击前一个月
            prevMonth(){
                let prevMonthDate = momnet(this.firstDate.join('-')).startOf('month').add(-1,'month');
                this.firstDate = prevMonthDate.format('YYYY-MM-DD').split('-');
                this.getDateArray();
            },
            //点击下一个月
            nextMonth(){
                let nextMonthDate = momnet(this.firstDate.join('-')).startOf('month').add(1,'month');
                this.firstDate = nextMonthDate.format('YYYY-MM-DD').split('-');
                this.getDateArray();
            },
            //点击前一年
            prevYear(){
                let prevYearDate = momnet(this.firstDate.join('-')).startOf('month').add(-1,'year');
                this.firstDate = prevYearDate.format('YYYY-MM-DD').split('-');
                this.getDateArray();
            },
            //点击下一年
            nextYear(){
                let nextYearDate = momnet(this.firstDate.join('-')).startOf('month').add(1,'year');
                this.firstDate = nextYearDate.format('YYYY-MM-DD').split('-');
                this.getDateArray();
            },
            //点击上一列表年
            prevYears(){
                let yearList = [];
                for(let i = 0; i < this.yearList.length; i++){
                    yearList.push(this.yearList[i]-15);
                }
                this.yearList = yearList;
            },
            //点击下一列表
            nextYears(){
                let yearList = [];
                for(let i = 0; i < this.yearList.length; i++){
                    yearList.push(this.yearList[i]+15);
                }
                this.yearList = yearList;
            },
            //点击年
            clickYear(item){
                let firstDate = this.firstDate;
                firstDate.splice(0,1,item+'');
                this.select = 'month';
                this.getDateArray();
            },
            clickMonth(index){
                let month = index+1;
                month = month<10?'0'+month:''+month;
                let firstDate = this.firstDate;
                firstDate.splice(1,1,month);
                this.select = 'date';
                this.getDateArray();
            }
        }
    }
</script>
<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: all .3s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: scale(1.2);
    }
    .zss-date-picker{
        display: inline-block;
        box-sizing: border-box;
        width: 400px;
        height: 40px;
        border: 1px solid #E6E6E6;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
    }
    .zss-date-picker >.zss-date-input{
        width: 100%;
        height: 100%;
        border: 0;
        box-sizing: border-box;
        padding: 0 20px;
        outline: none;
        font-size: 16px;
        color: #414141;
    }
    .zss-date-picker > .zss-picker-model{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        background: rgba(0,0,0,.5);
    }
    .zss-date-picker > .zss-picker-model > .zss-panel{
        margin: 0 auto;
        width: 550px;
        height: 440px;
        background: #FFF;
        padding: 10px;
        box-shadow: 0 10px 20px rgba(0,0,0,.2);
    }
    .zss-panel > .zss-panel-header{
        display: flex;
        height: 60px;
        line-height: 60px;
        border-bottom:1px solid #E6E6E6;
        background: #EEE;
    }
    .zss-date-year{
        background: #FFF;
        flex: 1;
        height: 60px;
        display: flex;
    }
    .zss-date-month{
        background: #FFF;
        flex: 1;
        height: 60px;
        display: flex;
        margin-left:1px;
    }
    .zss-date-prev{
        flex: 1;
        cursor: pointer;
    }
    .zss-date-text{
        flex: 1;
        cursor: pointer;
    }
    .zss-date-next{
        flex: 1;
        cursor: pointer;
    }
    .zss-text-hover{
        transition: color .3s;
    }
    .zss-text-hover:hover{
        color: #25b864;
    }
    .zss-text-disabled{
        color: #E6E6E6;
    }
    .zss-panel-body{
        padding:20px 30px;
        overflow: hidden;
    }
    .zss-date-week{
        display: flex;
    }
    .zss-week{
        width: 70px;
        height: 30px;
    }
    .zss-date{
        float: left;
        width: 70px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        transition: all .3s;
        color: #E6E6E6;
    }
    .zss-month-now{
        color: #414141;
    }
    .zss-month-now:hover{
        color: #25b864;
    }
    .zss-date-now{
        background: #25b864;
        color: #FFF;
    }
    .zss-date-now:hover{
        color: #FFF;
    }
    .zss-year-box{
        overflow: hidden;
    }
    .zss-year{
        float: left;
        width: 98px;
        height: 100px;
        line-height: 100px;
        cursor: pointer;
        text-align: center;
    }
    .zss-year:hover{
        color: #25b864;
    }
    .zss-year-control{
        display: flex;
        height: 40px;
        line-height: 40px;
    }
    .zss-control-prev{
        flex: 1;
        cursor: pointer;
    }
    .zss-control-prev:hover{
        color: #25b864;
    }
    .zss-control-next{
        flex: 1;
        cursor: pointer;
    }
    .zss-control-next:hover{
        color: #25b864;
    }
    .zss-month-box{
        overflow: hidden;
        padding: 30px 0;
    }
    .zss-month{
        width: 122.5px;
        height: 50px;
        float: left;
        cursor: pointer;
    }
</style>
