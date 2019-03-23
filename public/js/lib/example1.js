var map1 = null;
function createProvince(lng=104.067923463,lat=30.6799428454,provinceName="四川省") {
    bmap = null;
    map2 = null;
    map1 = new BMap.Map("map",{minZoom : 1, maxZoom : 18 });                        // 创建Map实例
    map1.centerAndZoom(new BMap.Point(lng+5,lat), 7);     // 初始化地图,设置中心点坐标和地图级别
    map1.enableScrollWheelZoom(true);

    var cityName = provinceName;
    // map1.addControl(new BMap.OverviewMapControl());             
    //     var bdary = new BMap.Boundary();
    //     bdary.get(cityName, function (rs) {       //获取行政区域       
    //         var E_JW = "170.672126, 39.623555;";            //东
    //         var EN_JW = "170.672126, 81.291804;";       //东北角
    //         var N_JW = "105.913641, 81.291804;";        //北
    //         var NW_JW = "-169.604276,  81.291804;";     //西北角
    //         var W_JW = "-169.604276, 38.244136;";       //西
    //         var WS_JW = "-169.604276, -68.045308;";     //西南角
    //         var S_JW = "114.15563, -68.045308;";            //南
    //         var SE_JW = "170.672126, -68.045308 ;";         //东南角
    //         //4.添加环形遮罩层
    //     var ply1 = new BMap.Polygon(E_JW + SE_JW + S_JW + WS_JW + W_JW + NW_JW + EN_JW + E_JW, { strokeColor: "none",  fillColor: "#000c4d",fillOpacity: 1, strokeOpacity: 0 }); //建立多边形覆盖物
    //             map1.addOverlay(ply1);  //遮罩物是半透明的，如果需要纯色可以多添加几层
    //     // console.log(rs);
    // for (var i = 0; i < rs.boundaries.length; i++) {
    //     var ply0 = new BMap.Polygon(rs.boundaries[i] ,{  strokeWeight: 2, strokeColor: "#fff",fillColor: "#091934",fillOpacity: 1 }); //建立多边形覆盖物
    //     map1.addOverlay(ply0);
    // }
    //          
    //      });
    map1.setMapStyle({
            styleJson: [{
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                    "color": "#044161"
                }
            }, {
                "featureType": "land",
                "elementType": "all",
                "stylers": {
                    "color": "#091934"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry",
                "stylers": {
                    "color": "#064f85"
                }
            }, {
                "featureType": "railway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry.fill",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "highway",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981",
                    "lightness": -39
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#00508b"
                }
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "green",
                "elementType": "all",
                "stylers": {
                    "color": "#056197",
                    "visibility": "off"
                }
            }, {
                "featureType": "subway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "manmade",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "local",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "arterial",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#029fd4"
                }
            }, {
                "featureType": "building",
                "elementType": "all",
                "stylers": {
                    "color": "#1a5787"
                }
            }, {
                "featureType": "label",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": {
                    "color": "#ffffff"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": {
                    "color": "#1e1c1c"
                }
            }, {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": {
                    "visibility": "on"
                }
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }]
        });
}