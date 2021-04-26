// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
window.onresize = function () {
    myChart.resize();
};

// 指定图表的配置项和数据
var option = {
    //  backgroundColor:'#e8ecf0',//背景色
    // 图表标题
    title: [
        {
            text: '策略收益',
            subtext: '',
            top: '6%',
            left: '3%',
            textStyle: {
                color: '#0f64b1',
                fontStyle: 'normal',
                fontWeight: '600',
                fontFamily: 'sans-serif',
                fontSize: 12
            },
            subtextStyle: {
                color: '#0f64b1',
                fontStyle: 'normal',
                fontWeight: '600',
                fontFamily: 'sans-serif',
                fontSize: 11
            }
        },
        {
            text: '基准收益',
            subtext: '',
            top: '6%',
            left: '20%',
            textStyle: {
                color: '#0f64b1',
                fontStyle: 'normal',
                fontWeight: '600',
                fontFamily: 'sans-serif',
                fontSize: 12
            },
            subtextStyle: {
                color: '#0f64b1',
                fontStyle: 'normal',
                fontWeight: '600',
                fontFamily: 'sans-serif',
                fontSize: 11
            }
        },
        {
            text: '日平均收益',
            subtext: '',
            top: '6%',
            left: '37%',
            textStyle: {
                color: '#0f64b1',
                fontStyle: 'normal',
                fontWeight: '600',
                fontFamily: 'sans-serif',
                fontSize: 12
            },
            subtextStyle: {
                color: '#0f64b1',
                fontStyle: 'normal',
                fontWeight: '600',
                fontFamily: 'sans-serif',
                fontSize: 11
            }
        },
        {
            text: '年收益率',
            subtext: '',
            top: '6%',
            left: '54%',
            textStyle: {
                color: '#0f64b1',
                fontStyle: 'normal',
                fontWeight: '600',
                fontFamily: 'sans-serif',
                fontSize: 12
            },
            subtextStyle: {
                color: '#0f64b1',
                fontStyle: 'normal',
                fontWeight: '600',
                fontFamily: 'sans-serif',
                fontSize: 11
            }
        }
    ],

    // 提示框信息
    tooltip: {
        trigger: 'axis', //坐标轴触发，主要用于柱状图，折线图等
        backgroundColor: '#fff', //提示框背景色
        color: 'black',
        borderWidth: '1', //提示框边框
        borderColor: '#0f77ff', //提示框边框色
        textStyle: {
            color: 'black', //提示框文本色
            fontSize: 12,  //提示框文本字体大小
        },
        padding: 10, //内边距
        //  悬浮提示框日期，星期，时间
        formatter: function (params) {
            var result = getWeekday(params[0].axisValue) + "<br>";
            params.forEach(function (item) {
                if (item.axisValue) {
                    result += item.marker + " " + item.seriesName + " : " + item.value + "%</br>";
                }
            });
            return result;
        }
    },

    // 图例
    legend: {
        x: 'left', //最上方名称居左显示
        padding: [8, 0, 0, 40],
        data: ['策略收益', '基准收益'] //最上方名称
    },

    // 绘图网格
    grid: {
        top: '15%',
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
    },

    // 最下边的日期轴
    dataZoom: [
        {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'empty',
            height: 15
        },
        {
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'empty'
        }
    ],

    // X轴
    xAxis: {
        type: 'category',
        boundaryGap: false,
        "splitLine": {
            "show": true
        },
        data: []
    },

    // Y轴
    yAxis: {
        position: "right",
        type: 'value',
        scale: true,
        minInterval: 1,
        boundaryGap: [0.1, 0.1],
        axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %'
        },
        // 去除y轴上的刻度线
        axisTick: {
            show: false
        },
    },

    // 系列列表，每个系列通过type决定自己的图表类型
    series: [
        {
            name: '策略收益',
            type: 'line', //系列列表类型
            areaStyle: {
                normal: {
                    color: 'rgba(16,120,255,.1)' //折线区域颜色
                }
            },
            itemStyle: {
                normal: {
                    color: '#0f77ff', //改变折线点的颜色
                    lineStyle: {
                        color: '#0f77ff' //改变折线颜色
                    }
                }
            },
            data: []
        },
        {
            name: '基准收益',
            type: 'line',
            areaStyle: {
                normal: {
                    color: 'rgba(253,158,34,.1)' //折线区域颜色
                }
            },
            itemStyle: {
                normal: {
                    color: '#ff970f', //改变折线点的颜色
                    lineStyle: {
                        color: '#ff970f' //改变折线颜色
                    }
                }
            },
            data: []
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

window.onresize = myChart.resize;

function getWeekday(sDate) {
    var dt = new Date(sDate.replace(/-/g, '/'));
    // console.log(dt.getMonth())
    var a = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return a[dt.getDay()] + "，" + (dt.getMonth() + 1) + "月" + dt.getDate() + "，16:00";
}