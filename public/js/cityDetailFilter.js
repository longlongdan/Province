$(() => {
    let startTime;
    let endTime;
    $("#industry").selectpicker('val', 'all');
    $("#reglocation").selectpicker('val', '全部');
    //绑定过滤面板的事件
    //行业选择
    $("#industry").change(function() {
        filter();
    })
    //区域选择
    $("#reglocation").change(function() {
        filter();
    })
    //时间选择
    getCityInfo(() => {
        var myChart = echarts.init(document.getElementById('establichTime'));
        var base = +new Date(1968, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var date = [];//从小到大放入所有日期
    
        var data = [];
    
        for(var key in cityInfo) {
            for(var item_info of cityInfo[key]) {
                date.push(item_info.estiblishtime, item_info.updatetimes)
            }
        }
        //去重
        date = Array.from(new Set(date))
        //从小到大排序
        date.sort();
        option = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date,
                show: false
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                show: false
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 100,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                textStyle: {
                    color: "#fff"
                },
                fillerColor: "#337AB7",
                realtime: false
            }],
            series: [
                {
                    // name:'模拟数据',
                    type:'line',
                    smooth:false,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: "#000C4D",
                    },
                    data: data
                }
            ]
        };
    
        myChart.setOption(option); 
        myChart.on("datazoom", function (param) {
            //存在bug，时间改变后对于区域的选择不在了
            //区域选择后对于时间的选择也不在了
            startTime = date[myChart.getModel().option.dataZoom[0].startValue];//成立时间
            endTime = date[myChart.getModel().option.dataZoom[0].endValue];//最后更新时间
            filter();
        })
    })
    function filter() {
        //行业筛选
        choseCity = [];
        if($("#industry").val() && $("#industry").val().includes("all")) {
            $("#industry").selectpicker('val', 'all');
            for(let key in cityInfo) {
                choseCity = choseCity.concat(cityInfo[key]);
            }
        }
        else if($("#industry").val()){ 
            for(let item of $("#industry").val()) {
                choseCity = choseCity.concat( cityInfo[item] )
            }
        }
        //区域的筛选
        if($("#reglocation").val() && $("#reglocation").val().includes("全部")) {
            $("#reglocation").selectpicker('val', '全部');
        }
        else if($("#reglocation").val()){
            choseCity = choseCity.filter((item, index) => {
                for(var i of $("#reglocation").val()) {
                    if(item.district === i) return true;
                }
                return false;
            })
        }
        else {
            choseCity = [];
        }
        //时间的筛选
        if(startTime && endTime) {
            //存在时间的限制
            choseCity = choseCity.filter((item, index) => item.estiblishtime>startTime && item.updatetimes<endTime)
        }
        //绘制地图点
        drawCityDetail(choseCity);
    }
})
     