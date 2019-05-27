$().ready(function(){
    
	jisuan(allDraw);
	function allDraw() {
		// 绘制主图的所有视图，异步
        createChina();
        showChinaData();
        GetCloudData("四川");
        createSort();
        //测试代码
        // drawCompanyCompare();
	}
  // $("#map").hide();
  $("#back").click(function(e){
   $("#map").show();
   $("#wordCloud").show();
   $("#Citydetail").hide();
   $("#sort").show();
   $("#companyCompareComtainer").hide();
   if (!map1&&!bmap) {
    map1 = true;
    bmap = null;
    createProvince();
    showProvinceData();
    GetCloudData("成都");
   }
      // 返回上一级地图
    else if (map1&&!bmap) {
        //返回首页
        createChina();
        showChinaData();
        createSort();
        GetCloudData("四川");
    }
  })

  //清空数据
  $("#clear").click(function(e){
    // var temp = {};
    // for(var key in companies) {
    //   temp[key] =  companies[key];
    //   break;
    // }
    // companies = temp;
    companies = {};
    drawCompanyCompare();
  })
});