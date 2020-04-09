import echarts from 'echarts'
export default{
    drawLineBar(el,title,tip,dataX,dataY){
        // 基于准备好的dom，初始化echarts实例
        let myChart = el;
        // 绘制图表
        myChart.setOption({
            title : {
                text: title,
                x:'center'
            },
           color: ['#F9C275','#E4906C','#D7A6EF','#E0A6EF','#A3EFB4','#76AD82','#7DDCD5','#B3DA81','#6DD6F7','#27758E','#758DF9','#809DC1','#7CB6FF','#F4D771','#C9DC8B',],
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                        type: 'shadow'
                    }
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    name:"节点",
                    type : 'category',
                    data : dataX,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    name: "SPOK",
                    type: 'value',
                },
            ],
            series: [
                {
                    name: tip,
                    type: 'bar',
                    barWidth: '50%',
                    data: dataY
                },
            ]
       },true);
    },
    // 首页折线图
    drawLine(el,title,dataX,dataY){
        // 基于准备好的dom，初始化echarts实例
        let myChart = el;
        // 绘制图表
        myChart.setOption({
            // toolbox: {
            //     feature: {
            //         dataZoom: {
            //             // yAxisIndex: 'none'
            //         },
            //         restore: {},
            //         saveAsImage: {}
            //     },
            //     right:"20px"
            // },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true,
                lineStyle: {
                    // 线条的样式
                    normal: {
                      color: "red",
                      width: 1 // 折线的颜色
                    }
                  },
            }]
        },true)
    },
    // 节点柱状图
    drawNodeBar(el,title,dataX,dataY){
        // 基于准备好的dom，初始化echarts实例
        let myChart = el;
        // 绘制图表
        myChart.setOption({
            color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
            alignWithLabel: true
        }
    },
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220],
            label: {
                show: true,
                position: 'inside',
                color:"#fff"
            },
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    1, 0, 0, 0,
                    [
                        {offset: 0, color: '#94291e'},
                            {offset: 0.5, color: '#bd252b'},
                            {offset: 1, color: '#ec213a'}
                        
                    ]
                )
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: '#ec213a'},
                            {offset: 0.7, color: '#bd252b'},
                            {offset: 1, color: '#94291e'}
                        ]
                    )
                }
            }
        }
    ]
        })
    }
}