// function createCityDetail(lng=104.73 ,lat=31.47,data) {
	var myChart = echarts.init(document.getElementById('line'));
	// map1 = null;
	// bmap = null;
	// map2 = true;
getCityDetail(drawCityDetail);


function drawCityDetail(data) {
    // myChart.clear();
	option = {
    // backgroundColor: '#404a59',
    title: {
        text: '绵阳市军民融合度',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip : {
        trigger: 'item'
    },
    bmap: {
        center: [104.73,31.20],
        zoom: 10,
        roam: true,
        mapStyle: {
            styleJson: [
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": {
                            "color": "#044161"
                        }
                    },
                    {
                        "featureType": "land",
                        "elementType": "all",
                        "stylers": {
                            "color": "#081734"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#064f85"
                        }
                    },
                    {
                        "featureType": "railway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#005b96",
                            "lightness": 1
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#00508b"
                        }
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "green",
                        "elementType": "all",
                        "stylers": {
                            "color": "#056197",
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "subway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "manmade",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "local",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#029fd4"
                        }
                    },
                    {
                        "featureType": "building",
                        "elementType": "all",
                        "stylers": {
                            "color": "#1a5787"
                        }
                    },
                    {
                        "featureType": "label",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    }
            ]
        }
    },
    series : [
        {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: data,
            symbolSize: function (val) {
                return (val[2]-67) /2;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ddb926'
                }
            }
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: data.sort(function (a, b) {
                return b["value"][2] - a["value"][2];
            }).slice(0, 5),
            symbolSize: function (val) {
                return (val[2]-67) /2;
            },
            showEffectOn: 'emphasis',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            zlevel: 1
        }
    ]
};
    myChart.setOption(option); 
    myChart.on("click", function (param) {
        for(let item of choseCity) {
            if(item.name === param.name)
                {
                    //添加到公司对比中查找列表，添加列表
                    if(!companies[item.id]) {
                        //公司对比列表里面没有
                        companies[item.id] = item;
                        addCompanyCompare(item);
                    }
                    //拼接信息
                    var str = `<p class="title">${item.name}</p>
                    <p><span>军民融合度分数：</span>${item.value[2]}</p>
                    <p><span>所属产业：</span>${item.industry}</p>
                    <p><span>涉及产业：</span><i>${item.businessscope}</i></p>
                    <p><span>成立日期：</span>${item.estiblishtime}</p>
                    <p><span>更新日期：</span>${item.updatetimes}</p>
                    <p><span>截至日期：</span>${item.totime}</p>
                    <p><span>坐标：</span>${item.district},${item.reglocation}</p>
                    <p><span>法人代表：</span>${item.legalpersonname}</p>
                    <p><span>公司高层：</span>${item.stafflist}</p>
                    <p><span>邮箱：</span>${item.email}  <span>电话：</span>${item.phonenumber}</p>
                    <p><span>经纬度坐标：</span>${item.value[0]},${item.value[1]}</p>`
                    $("#Citydetail").html(str);
                    return;
                }
        } 
   })
}