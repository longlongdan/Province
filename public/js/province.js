// bmap.centerAndZoom(new BMap.Point(104.067923463,30.6799428454), 7); // 初始化地图,设置中心点坐标和地图级别
var layer1 = null;
var citysData = [];
function showProvinceData(citys = null) {
    // // 第一步创建mapv示例
    var mapv1 = new Mapv({
        drawTypeControl: true,
        map: map1  // 百度地图的map实例
    });
    var data1 = [];
    //传入关键字相关城市
    if (citys) {
        citysData.map((item)=>{
            let canPush = true;
            if (citys.indexOf(item[0])!==-1) {
                for(let i=0;i<data1.length;i++) {
                    if(data1[i].name === item[0]) {
                        canPush = false;
                        break;
                    }
                }
                if(canPush) {
                    data1.push({
                        name: item[0],
                        geo: item[1],
                        count: item[2],
                        index: item[2]/100
                    })
                }
            }
        })
        layer1.setData(data1);
        //更新一下sort排序图
        createSort(data1, "province");
        return;
    }
    //已经获取了省份的城市信息
    else if (provinceData.length) {
        for (var i=0;i<provinceData.length;i++) {
            getBoundary(provinceData[i].name,provinceData[i].index);
        }
    }
    //首次加载
    else {
        //获取数据，存入provinceData
        getProvinceData(()=>{
            for (var i=0;i<provinceData.length;i++) {
                getBoundary(provinceData[i].name,provinceData[i].index);
            }
        })
    }
    
   

    var cityLoad = { //判断加载完成的城市边界数据
    }

    function getBoundary(cityname,index){
        var bdary = new BMap.Boundary();
        bdary.get(cityname, function(rs){ // 异步加载
            cityLoad[cityname] = true;
            for (var i = 0; i < rs.boundaries.length; i++) {
                var boundary = rs.boundaries[i];
                boundary = boundary.split(";");
                for (var j = 0; j < boundary.length; j++) {
                    boundary[j] = boundary[j].split(",");
                }
                //把返回结果存起来
                citysData.push([cityname.replace(/自治区|市|维吾尔|壮族|藏|羌族|羌州|彝|族|自治州/g,""),boundary,(index*100).toFixed(3)]);

                data1.push({
                    geo: boundary,
                    count: (index*100).toFixed(3),
                });
            }
            //想在地图上显示text，可惜会被遮挡,将上面的遮罩设置为透明

            if (isAllComplete()) {
                allLoadCallback();
            }
        });
    }

    // /**
    //  * 是否全部加载完成
    //  */
    function isAllComplete() {
        for (var i=0;i<provinceData.length;i++) {
            if (!cityLoad[provinceData[i].name]) {
                return false;
            }
        }
        return true;
    }


    function allLoadCallback() {

        layer1 = new Mapv.Layer({
            zIndex: -1,
            mapv: mapv1,
            dataType: 'polygon',
            data: data1,
            drawType: 'intensity',
            drawOptions: {
                max: 10,
                label: { // 显示label文字
                    show: true, // 是否显示
                    font: "11px", // 设置字号
                    minZoom: 7, // 最小显示的级别
                    fillStyle: 'rgba(255, 255, 255, 1)' // label颜色
                },
                gradient: {
                     '0.01': 'rgba(0,0,255,.5)',
                    '0.1': 'rgba(0,255,255,.5)',
                    '0.2': 'rgba(0,255,0,.5)',
                    '0.3': 'rgba(255,255,0,.5)',
                    '1.0': 'rgba(255,0,0,.5)'
                },
            }
        });

    }
    //获取点击事件 切换城市关键字
 //去掉双击放大
    map1.disableDoubleClickZoom()

//通过定时器完成双击和单机的判断
    var timer=null;
    map1.addEventListener('click',function(e){
      clearTimeout(timer);
      timer=setTimeout(()=>{//初始化一个延时
        changeInfo(e);
      },250)
    },false);
    map1.addEventListener('dblclick',(e)=>{//双击事件会先触发两次单击事件，然后再执行双击事件，使用清除定时器来达到双击只执行双击事件的目的
      clearTimeout(timer);
      showInfo(e);
    },false);

    function showInfo(e) {
        var geoc = new BMap.Geocoder(); 
        var point = new BMap.Point(e.point.lng, e.point.lat);
    //     geoc.getLocation(point, function (rs) {
    //         var addComp = rs.addressComponents.city;
    //         //去掉最后一个省和区 更新词云
    //         GetCloudData(addComp.replace(/自治区|市|维吾尔|壮族|藏|羌族|羌州|彝|族|自治州/g,""))
    //         });
        //显示城市的具体信息
        $("#map").hide();
        $("#wordCloud").hide();
        $("#Citydetail").show();
        $("#sort").hide();
        $("#companyCompareComtainer").show();
        map1 = null;
        drawCompanyCompare();
    };
    function changeInfo(e) {
        var geoc = new BMap.Geocoder(); 
        var point = new BMap.Point(e.point.lng, e.point.lat);
        geoc.getLocation(point, function (rs) {
            var addComp = rs.addressComponents.city;
            //去掉最后一个省和区 更新词云
            GetCloudData(addComp.replace(/自治区|市|维吾尔|壮族|藏|羌族|羌州|彝|族|自治州/g,""))
            });
    }
}

