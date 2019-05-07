

var Companiesobj = {}
function drawCompanyCompare() {
    var myChart_Compare = echarts.init(document.getElementById('companyCompare'));
    //每个数组代表行业 全局的compaines存的是公司信息{id1: [公司信息]，id2：[公司信息]}，取出industy_c的值，对应放入数组
    var Companiesobj = {};
    
    //计算一下分数，成立日期，更新日期，注册日期，截至日期的max，min
    //计算有哪些区域
    var _value = [];
    var _estiblishtime = [];
    var _updatetimes = [];
    var _approvedtime = [];
    var _totime = [];
    var _district = [];
    var _industry_c = [];
    for(var key in companies) {
        let {industry_c, value, estiblishtime, updatetimes, totime, approvedtime, district} = companies[key];
        if(Companiesobj[industry_c]) {
            Companiesobj[industry_c].push([value[2],estiblishtime, updatetimes, totime, approvedtime, district, industry_c]);
        }
        else {
            Companiesobj[industry_c] = [];
            Companiesobj[industry_c].push([value[2],estiblishtime, updatetimes, totime, approvedtime, district, industry_c]);
        }
        _value.push(value[2]);
        _estiblishtime.push(estiblishtime);
        _updatetimes.push(updatetimes);
        _approvedtime.push(approvedtime);
        _totime.push(totime);
        if(!_district.includes(district)) _district.push(district);
        if(!_industry_c.includes(industry_c)) _industry_c.push(industry_c);
    }
    console.log(Companiesobj);
    var schema = [
        {name: 'score', index: 0, text: '分数'},
        {name: 'estiblishtime', index: 1, text: '成立日期'},
        {name: 'updateTime', index: 2, text: '更新日期'},
        {name: 'toTime', index: 3, text: '截至日期'},
        {name: 'approvedtime', index: 4, text: ' 注册日期'},
        {name: 'district', index: 5, text: '区域'},
        {name: 'industry', index: 6, text: '行业'}
    ];
    var seriesData = [];
    for(var key in Companiesobj) {
        seriesData.push({           
            name: key,
            type: 'parallel',
            lineStyle: lineStyle,
            data: Companiesobj[key]
        })
    }
    
    var lineStyle = {
        normal: {
            width: 0.5,
            opacity: 0.5
        }
    };
    
    option = {
        title: {
            text: '多公司对比分析',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        backgroundColor: '#081633',
        legend: {
            bottom: 30,
            data: Object.keys(Companiesobj),
            itemGap: 20,
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'axis',
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1,
            formatter: function (obj) {
                var value = obj[0].value;
                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                    + obj[0].seriesName + ' ' + value[0] + '日期：'
                    + '</div>'
                    + schema[1].text + '：' + value[1] + '<br>'
                    + schema[2].text + '：' + value[2] + '<br>'
                    + schema[3].text + '：' + value[3] + '<br>'
                    + schema[4].text + '：' + value[4] + '<br>'
                    + schema[5].text + '：' + value[5] + '<br>'
            }
        },
        parallelAxis: [
            {dim: 0, name: schema[0].text, inverse: true, max: Math.max(..._value), min: Math.min(..._value), nameLocation: 'start'},
            {dim: 1, name: schema[1].text, max: Math.max(..._estiblishtime), min: Math.min(_estiblishtime)},
            {dim: 2, name: schema[2].text, max: Math.max(..._updatetimes), min: Math.min(..._updatetimes)},
            {dim: 3, name: schema[3].text, max: Math.max(..._totime), min: Math.min(..._totime)},
            {dim: 4, name: schema[4].text, max: Math.max(..._approvedtime), min: Math.min(..._approvedtime)},
            {dim: 5, name: schema[5].text, type: 'category', data: _district},
            {dim: 6,name: schema[6].text, type: 'category', data: _industry_c}
        ],
        visualMap: {
            show: true,
            min: Math.min(..._value),
            max: Math.max(..._value),
            dimension: 0,
            inRange: {
                color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
                // colorAlpha: [0, 1]
            }
        },
        parallel: {
            left: '5%',
            right: '18%',
            bottom: 100,
            parallelAxisDefault: {
                type: 'value',
                name: 'AQI指数',
                nameLocation: 'end',
                nameGap: 20,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 12
                },
                axisLine: {
                    lineStyle: {
                        color: '#aaa'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#777'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        },
        series: seriesData
    };
    myChart_Compare.setOption(option); 
    myChart_Compare.on('click', (param) => {
        console.log(param);
    })
    myChart_Compare.on('hover', (param) => {
        console.log(1);
        console.log(param);
    })
}
function addCompanyCompare(data) {
    console.log(data);
    //往Companiesobj里面加入data
    drawCompanyCompare();
    console.log(Companiesobj);
}
function removeCompanyCompare(data) {
    console.log(data);
    //往compainesObj里面删除data
    drawCompanyCompare();
    consoloe.log(Companiesobj);
}
