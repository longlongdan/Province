var cityData = []
var provinceData = []
var wordsDisctData = []
var cityDetailData = []
function jisuan(callback){
	d3.csv("./static/allProvinceData.csv",function(error,csvdata){
		if(error){
			console.log(error);
		}
		for (var i = 0; i < csvdata.length; i++) {
			//规范化处理
			var temp = Math.sqrt(Math.pow(csvdata[i].Web,2)+Math.pow(csvdata[i].News,2)+Math.pow(csvdata[i].Media,2))
			csvdata[i].News /= temp;
			csvdata[i].Media /= temp;
			csvdata[i].Web /= temp;
			//加权规范化处理
			csvdata[i].News *= csvdata[i].Index;
			csvdata[i].Media *= csvdata[i].Index;
			csvdata[i].Web *= csvdata[i].Index;
			//确定理想解和负理想解
			var max = Math.max(csvdata[i].News,csvdata[i].Web,csvdata[i].Media);
			var min = Math.min(csvdata[i].News,csvdata[i].Web,csvdata[i].Media);
			//计算军民融合度指数
			var s1 = 3*max -(csvdata[i].News+csvdata[i].Web+csvdata[i].Media);
			var s2 = (csvdata[i].News+csvdata[i].Web+csvdata[i].Media) - 3*min;
			csvdata[i].r = s1/(s1+s2);
		}
		cityData = csvdata;
		callback();
	});
}
//获取省份的index融合度
function getProvinceData(callback) {
	d3.csv("./static/sichuan.csv",function(error,csvdata) {
		if (error) {
			console.log(error);
		}
		provinceData = csvdata;
		callback();
	})
}
//获取对应城市的关键词
function getTotalData(callback) {
	$.getJSON("./static/wordsDict.json",(res)=>{
		wordsDisctData = res;
		callback(res);
	})
}
// 获取城市的具体信息
function getCityDetail(callback) {
	d3.csv("./static/mianyang1.csv",function(error,csvdata) {
		if (error) {
			console.log(error);
		}
		var tt = [];
		for (var i = 0; i < csvdata.length; i++) {
			tt.push({name:csvdata[i].name,value:[csvdata[i].lng,csvdata[i].lat,csvdata[i].score]})
		}
		callback(tt);
	})
}

