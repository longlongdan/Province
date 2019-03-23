$().ready(function(){
    
	jisuan(allDraw);
	function allDraw() {
		// 绘制主图的所有视图，异步
        createChina();
        showChinaData();
	    GetCloudData("四川");
	}
  // $("#map").hide();
  $("#back").click(function(e){
   $("#map").show();
   if (!map1&&!bmap) {
    map1 = true;
    bmap = null;
   }
      // 返回上一级地图
    else if (map1&&!bmap) {
        //返回首页
        createChina();
        showChinaData();
    }
  })
});