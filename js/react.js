 
 function createReact(){
    // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('react'));
        // console.log(cityData)
        let dataName= [];
        let dataR = [];
        for (var i = 0; i < cityData.length; i++) {
            dataName.push(cityData[i].Provinces);
            dataR.push({value:((cityData[i].r-0.6)*100-3)*10, name: cityData[i].Provinces},);
        }
        // console.log(dataName)
        // console.log(dataR)
        // 指定图表的配置项和数据
option = {
    title: {
        text: '天气情况统计',
        subtext: '虚构数据',
        left: 'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
        data: dataName,
        type:'scroll',
         textStyle:{//图例文字的样式
            color:'#fff'
        }
    },
    series : [
        {
            type: 'pie',
            radius : '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data:dataR,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

        myChart.on("click", function (param) { 
           //根据地址寻找点
            var myGeo = new BMap.Geocoder();         
            myGeo.getPoint(param.name, function(point){      
                if (point) {      
                     createProvince(point.lng, point.lat,param.name);  
                }      
             });
           GetCloudData(param.name.replace(/省|自治区|市|维吾尔|壮族/g,""))
        })
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option); 
    }
 
