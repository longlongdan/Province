 
 function createLine(){
    // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('line'));
        // console.log(cityData)
        let dataName= [];
        let dataR = [];
        for (var i = 0; i < cityData.length; i++) {
            dataName.push(cityData[i].Provinces);
            dataR.push((cityData[i].r-0.6)*10);
        }
        // console.log(dataName)
        // console.log(dataR)
        // 指定图表的配置项和数据
        option = {
            xAxis: {
                type: 'category',
                data: dataName,
                axisLine: {
                   lineStyle: {
                       color: '#fff'
                   }
               },
               axisLabel:{
                 interval:0,//0：全部显示，1：间隔为1显示对应类目，2：依次类推，（简单试一下就明白了，这样说是不是有点抽象）
                 rotate:-30,//倾斜显示，-：顺时针旋转，+或不写：逆时针旋转
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                   lineStyle: {
                       color: '#fff'
                   }
               }
            },
             tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    var tar = params[0];
                    return tar.name+'<br />' +tar.value;
                }
            },
            series: [{
                data: dataR,
                type: 'line'
            }]
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
 
