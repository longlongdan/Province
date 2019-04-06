var cityData = []
var provinceData = []
var wordsDisctData = []
var cityDetailData = []
var cityInfo = {
	manufacture: [],
	service: [],
	science: [],
	spin: [],
	wholesale: [],
	products: [],
	machining: [],
	install: [],
	government: [],
	architecturea: [],
	other: []
};
var choseCity = [];
var t = [];
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
		for (var i = 0; i < csvdata.length; i++) {
			t.push({name:csvdata[i].name,value:[csvdata[i].lng,csvdata[i].lat,csvdata[i].score]})
		}
		callback(t);
	})
}
function getCityInfo(callback) {
	//获取城市的具体信息，按行业分类
	d3.csv("./static/mianyang.csv",function(error,csvdata) {
		csvdata.forEach((item, index) => {
			//放一下value的值，方便后面绘制
			for(var i=0;i<t.length;i++) {
				if(item.name === t[i].name) {
					item.value = t[i].value;
					break;
				}
			}
			//分区
			cityInfoHandle.handleReglocation(item);
			//分类别&&存放
			cityInfoHandle.handleIndustry(item);
			//对时间做处理
			cityInfoHandle.handleTime(item, "approvedtime");
			cityInfoHandle.handleTime(item, "estiblishtime");
			cityInfoHandle.handleTime(item, "totime");
			cityInfoHandle.handleTime(item, "updatetimes");
		})
		//放一下初始的cityInfo
		for(let key in cityInfo) {
			choseCity = choseCity.concat(cityInfo[key]);
		}
		callback();
	})
}
var cityInfoHandle = {
	handleReglocation: function(item) {
		//存一下在绵阳的哪个区
		let reglocation = item.reglocation;
		if(reglocation.indexOf("高新区") !== -1) {
			item.district = "高新区"
		}
		else if(reglocation.indexOf("游仙") !== -1) {
			item.district = "游仙区"
		}
		else if(reglocation.indexOf("涪城区") !== -1) {
			item.district = "涪城区"
		}
		else if(reglocation.indexOf("科创") !== -1 || reglocation.indexOf("科教创业园区") !== -1) {
			item.district = "科创园区"
		}
		else if(reglocation.indexOf("经开区") !== -1 || reglocation.indexOf("经济技术开发区") !== -1 || reglocation.indexOf("经济开发区") !== -1) {
			item.district = "经开区"
		}
		else if(reglocation.indexOf("安州") !== -1) {
			item.district = "安州区"
		}
		else if(reglocation.indexOf("平武") !== -1) {
			item.district = "平武区"
		}
		else if(reglocation.indexOf("农科") !== -1) {
			item.district = "农科区"
		}
		else if(reglocation.indexOf("北川羌族自治县") !== -1) {
			item.district = "北川羌族自治县"
		}
		else if(reglocation.indexOf("安县") !== -1) {
			item.district = "安县"
		}
		else if(reglocation.indexOf("三台县") !== -1) {
			item.district = "三台县"
		}
		else if(reglocation.indexOf("梓潼县") !== -1) {
			item.district = "梓潼县"
		}
		else if(reglocation.indexOf("江油") !== -1) {
			item.district = "江油市"
		}
		else {
			//不存在这些关键字，通过经纬度坐标去查找
			var geoc = new BMap.Geocoder(); 
			var point = new BMap.Point(item.lng,item.lat);
			geoc.getLocation(point, function (rs) {
				item.district = rs.addressComponents.district;
	        });
		}
	},
	handleIndustry: function(item) {
		//分一下行业类别
		let industry = item.industry;
		if(industry.indexOf("制造业") !== -1) {
			cityInfo.manufacture.push(item);
		}
		else if(industry.indexOf("服务") !== -1) {
			cityInfo.service.push(item);
		}
		else if(industry.indexOf("研究") !== -1) {
			cityInfo.science.push(item);
		}
		else if(industry.indexOf("纺织业") !== -1) {
			cityInfo.spin.push(item);
		}
		else if(industry.indexOf("批发业") !== -1) {
			cityInfo.wholesale.push(item);
		}
		else if(industry.indexOf("制品业") !== -1) {
			cityInfo.products.push(item);
		}
		else if(industry.indexOf("加工业") !== -1) {
			cityInfo.machining.push(item);
		}
		else if(industry.indexOf("安装") !== -1) {
			cityInfo.install.push(item);
		}
		else if(industry.indexOf("治理") !== -1) {
			cityInfo.government.push(item);
		}
		else if(industry.indexOf("建筑") !== -1) {
			cityInfo.architecturea.push(item);
		}
		else {
			cityInfo.other.push(item);
		}
	},
	handleTime: function(item, type) {
		var time = item[type];
		if(time.indexOf("E") !== -1) {
			time = time.replace("E","e");
			time = Number(time);
			time = new Date(time);
			item[type]= time.getFullYear() + "" + (time.getMonth() < 10?"0":"") + time.getMonth() + "" + (time.getDate() < 10?"0":"") + time.getDate();
		}
	}
}
