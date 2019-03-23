//画中国地图
/**
     * @file 示例代码
     */
    // map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5); // 初始化地图,设置中心点坐标和地图级别
var layer = null;
var mapData = [];
function showChinaData(provinces = null) {
    // 第一步创建mapv示例
    var mapv = new Mapv({
        drawTypeControl: true,
        map: bmap  // 百度地图的map实例
    });
    var data = []; // 取城市的点来做示例展示的点数据
    if (provinces) {
        var tempData = cityData.filter(item => provinces.indexOf(item.Provinces)!==-1)
        updateMap(tempData);
    }
    else createMap();
    function createMap() {
        if (mapData.length!==0) {
            var promise = new Promise(function(resolve,reject) {
                mapData.map(item=>{
                    let temp = {};
                    temp.lat = item[1].lat;
                    temp.lng = item[1].lng;
                    temp.count = item[2];
                    data.push(temp)
                })
                resolve();
            })
           
        }
        else {
               var promise = new Promise(function(resolve, reject) {
                var myGeo = new BMap.Geocoder();
                var p = 0;
                cityData.map((item)=>{
                    let temp = {};
                    myGeo.getPoint(item.Provinces, function(point){ 
                        p++;
                        if(point) {
                            //把数据存起来
                            mapData.push([item.Provinces,point,item.r*10]);
                             temp.lat = point.lat;
                             temp.lng = point.lng;
                             temp.count = item.r*10;
                             data.push(temp)
                        }   
                        if (p===cityData.length){
                            resolve();
                        } 
                    });
                })
            });  
        }
        

        promise.then(()=>{
            // 绘制line层
            data.sort((x,y)=>{ 
                return x.count- y.count; 
            })
            layer = new Mapv.Layer({
            mapv: mapv, // 对应的mapv实例
            zIndex: 1, // 图层层级
            dataType: 'point', // 数据类型，点类型
            data: data, // 数据
            drawType: 'bubble', // 展示形式
            drawOptions: { // 绘制参数
                // splitList数值表示按数值区间来展示不同大小的圆
                splitList: [
                    {
                        start: 6.15,
                        end: 6.25,
                        size: 2
                    },{
                        start: 6.25,
                        end: 6.35,
                        size: 3
                    },{
                        start: 6.35,
                        end: 6.45,
                        size: 4
                    },{
                        start: 6.45,
                        end: 6.55,
                        size: 5
                    },{
                        start: 6.55,
                        end: 6.652,
                        size: 6
                    },{
                        start: 6.652,
                        end: 6.654,
                        size: 7
                    },{
                        start: 6.654,
                        end: 6.656,
                        size: 8
                    },{
                        start: 6.656,
                        end: 6.658,
                        size: 9
                    },{
                        start: 6.658,
                        end: 6.660,
                        size: 10
                    },{
                        start: 6.660,
                        end: 6.662,
                        size: 11
                    },{
                        start: 6.662,
                        end: 6.664,
                        size: 12
                    },{
                        start: 6.664,
                        end: 6.666,
                        size: 13
                    },{
                        start: 6.666,
                        size: 14
                    }
                ],
                //globalCompositeOperation: 'lighter', //叠加模式
                strokeStyle: 'rgba(255, 255, 255, 1)', // 描边颜色，不设置则不描边
                lineWidth: 3, // 描边宽度，不设置则不描边
                fillStyle: "rgba(255, 255, 50, 0.8)" // 填充颜色
            }
        });
        },()=>{})
    }

    function updateMap(tempData) {
        tempData.map((item)=>{
            
            for (var i = 0; i < mapData.length; i++) {
                let temp = {}
                // console.log(mapData[i][0],item.Provinces)
                if(mapData[i][0] === item.Provinces) {
                     temp.lat = mapData[i][1].lat;
                     temp.lng = mapData[i][1].lng;
                     temp.count = item.r*10;
                     data.push(temp);
                }
            }
        })
        layer.setData(data);
    }
    //去掉双击放大
    bmap.disableDoubleClickZoom()

//通过定时器完成双击和单机的判断
    var timer=null;
    bmap.addEventListener('click',function(e){
      timer=setTimeout(()=>{//初始化一个延时
        changeInfo(e);
      },250)
    },false);
    bmap.addEventListener('dblclick',(e)=>{//双击事件会先触发两次单击事件，然后再执行双击事件，使用清除定时器来达到双击只执行双击事件的目的
      clearTimeout(timer);
      showInfo(e);
    },false);
//双击切换到省份单独显示
    function showInfo(e) {
        var geoc = new BMap.Geocoder(); 
        var point = new BMap.Point(e.point.lng, e.point.lat);
        geoc.getLocation(point, function (rs) {
            var addComp = rs.addressComponents;
//            console.log(addComp)
//重新绘制province
        createProvince(e.point.lng, e.point.lat,addComp.province);
        showProvinceData();
        //去掉最后一个省和区 更新词云
        GetCloudData(addComp.province.replace(/省|自治区|市|维吾尔|壮族/g,""))
        });

    }
    //单机只更改词云
    function changeInfo(e) {
            var geoc = new BMap.Geocoder(); 
            var point = new BMap.Point(e.point.lng, e.point.lat);
            geoc.getLocation(point, function (rs) {
                var addComp = rs.addressComponents;
            //去掉最后一个省和区 更新词云
                GetCloudData(addComp.province.replace(/省|自治区|市|维吾尔|壮族/g,""))
            });
    }

}
