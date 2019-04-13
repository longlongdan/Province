$(()=>{
    getCityInfo(showHyRange);
})

function showHyRange(data = cityInfo) {
    var myChart = echarts.init(document.getElementById('Analysis'));	
    myChart.title = '嵌套环形图';
    //定义两个变量存储你所选择的行业和区域，默认为全部
    var industry = '';
    var legion = '';
    let data1 = [];
    let data0 = [
        {value:data['manufacture'].length, name:'制造业', selected:true},
        {value:data['service'].length, name:'服务业'},
        {value:data['science'].length, name:'研究所'},
        {value:data['spin'].length, name:'纺织业'},
        {value:data['wholesale'].length, name:'批发业'},
        {value:data['products'].length, name:'制品业'},
        {value:data['machining'].length, name:'加工业'},
        {value:data['install'].length, name:'安装业'},
        {value:data['government'].length, name:'治理业'},
        {value:data['architecturea'].length, name:'建筑业'},
        {value:data['other'].length, name:'其他'},
    ]
    for(var i in data) {
        for(var j in data[i]) {
            if(j!=='length') {
                data1.push({value:data[i][j].length,name:j});
            }
        }
    }
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c}"
        },
        legend: {
            x: 'left',
            data:['制造业','服务业','研究所','纺织业','批发业','制品业','加工业','安装业','治理业','建筑业','其他','高新区','游仙区','涪城区','科创园区','经开区','安州区','平武区','农科区','北川羌族自治县','安县','梓潼县','三台县','江油市','宝兴县'],
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            textStyle: {
                color: '#58AFED'
            }
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:data0
            },
            {
                name:'访问来源',
                type:'pie',
                radius: ['40%', '55%'],
                data:data1
            }
        ]
    };
    myChart.setOption(option); 
    myChart.on("legendselectchanged", function (param) {
        let temp = JSON.parse(JSON.stringify(data));
        let tempData0 = [...data0];
        for(var i in param.selected) {
            if(!param.selected[i]) {
                //取消选中才进行下面的步骤
                switch(i){
                    //放入data0
                    case '制造业': {tempData0.splice(0,1,{value:0, name:'制造业', selected:true},);delete temp['manufacture'];break;}
                    case "服务业": {tempData0.splice(1,1,{value:0, name:'服务业'});delete temp['service'];break;}
                    case "研究所": {tempData0.splice(2,1,{value:0, name:'研究所'});delete temp['science'];break;}
                    case "纺织业": {tempData0.splice(3,1,{value:0, name:'纺织业'});delete temp['spin'];break;}
                    case "批发业": {tempData0.splice(4,1,{value:0, name:'批发业'});delete temp['wholesale'];break;}
                    case "制品业": {tempData0.splice(6,1,{value:0, name:'制品业'});delete temp['products'];break;}
                    case "加工业": {tempData0.splice(5,1,{value:0, name:'加工业'});delete temp['machining'];break;}
                    case "安装业": {tempData0.splice(7,1,{value:0, name:'安装业'});delete temp['install'];break;}
                    case "治理业": {tempData0.splice(8,1,{value:0, name:'治理业'});delete temp['government'];break;}
                    case "建筑业": {tempData0.splice(9,1,{value:0, name:'建筑业'});delete temp['architecturea'];break;}
                    case "其他": {tempData0.splice(10,1,{value:0, name:'其他'});delete temp['other'];break;}
                }
            }
        }
        // 放入data1
        data1 = [];
        for(var i in temp) {
            for(var j in temp[i]) {
                if(j!=='length'&&param.selected[j]) {
                    data1.push({value:temp[i][j].length,name:j});
                }
                else if(j!=='length'&&!param.selected[j]){
                    data1.push({value:0,name:j})
                }
            }
        }
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c}"
            },
            legend: {
                x: 'left',
                data:['制造业','服务业','研究所','纺织业','批发业','制品业','加工业','安装业','治理业','建筑业','其他','高新区','游仙区','涪城区','科创园区','经开区','安州区','平武区','农科区','北川羌族自治县','安县','梓潼县','三台县','江油市','宝兴县'],
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],
    
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:tempData0
                },
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['40%', '55%'],
                    data:data1
                }
            ]
        }
        myChart.setOption(option);
     })
    myChart.on("click", function (param) { 
        //判断哪些省份含这个关键字
      let name = param.data.name;
      if(LIANXI[name]) {
          //点击的是行业
          industry = industry === name ? '' : name;
          legion = '';
      }
      else {
        legion = legion === name ? '' : name;
      }
      //通过行业和区域筛选data数据
      let tempData = null;
      let Result = [];
      if(industry) tempData = {em: data[LIANXI[industry]]}; //取到的tempData都是对象，采用遍历的方法
      else tempData = data;
      if(legion) {
          //存在对区域的筛选
          for(var key in tempData) {
              tempData[key][legion].forEach((q) => {
                Result.push({name: q.name, value: q.value});
            })
          }
      }
      else {
          //不存在，tempData里的所有值
          for(var key in tempData) {
            for(var key2 in tempData[key]) {
                if(key2 === 'length') break;
                tempData[key][key2].forEach((q) => {
                    Result.push({name: q.name, value: q.value});
                })
            }
        }
      }
      drawCityDetail(Result);
   })

}