function createSort(data=cityData, sortType="china"){
    // 基于准备好的dom，初始化echarts实例
    let data1 = [];
    let data2 = [];
    if(sortType === "china") {
        data.sort((x, y)=>{
            return x.r - y.r
        })
        data.forEach((item)=>{
            data1.push(item.Provinces);
            data2.push((item.r-0.615)*1000);
        })
    }
    else {
        data.sort((x, y)=>{
            return x.index - y.index;
        })
        data.forEach((item)=>{
            data1.push(item.name);
            data2.push(item.index*100);
        })
    }
    var myChart = echarts.init(document.getElementById('sort'));
    myChart.title = '中国军民融合度 - 条形图';

    option = {
        title: {
            text: '中国军民融合度',
            subtext: '数据来自网络',
            textStyle: {
                fontWeight: "normal",
                color: "#fff", 
                fontSize: 14
              },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: data1 ,
            axisLine: {
                lineStyle: {
                    color: '#58afed', // X轴及其文字颜色
                }
            }
        },
        series: [
            {
                name: '军民融合度',
                type: 'bar',
                data: data2,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = ['#274D5F', "#6E7066", "#583746"]; //每根柱子的颜色
                            return colorList[params.dataIndex%colorList.length];
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option); 
    myChart.on("click", function (param) { 
        //根据地址寻找点
        GetCloudData(param.name);
     })
}