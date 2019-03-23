 
function GetCloudData(name="四川") {
    // getTotalData(createCloud.bind(this,data));
    getTotalData((res)=>{
        let data = res[name]?res[name]:[];
        let result = [];
        for(let i=0;i<data.length;i++) {
            result.push({
                name: data[i][0],
                value: data[i][1]*100
            })
        }
        createCloud(name,result);
    })
}

 function createCloud(name,data){
    // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('wordCloud'));
        // 指定图表的配置项和数据
        option = {
    title:{
        text:name
    },
    tooltip: {},
    series: [{
        type: 'wordCloud',
        gridSize: 20,
        sizeRange: [12, 50],
        rotationRange: [0, 0],
        shape: 'circle',
        textStyle: {
            normal: {
                color: function() {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        data: data
    }]
};
        
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option); 

        myChart.on("click", function (param) { 
             //判断哪些省份含这个关键字
            var provinces = [];
            for (var key in wordsDisctData) {
                for (var i = 0; i < wordsDisctData[key].length; i++) {
                    if(wordsDisctData[key][i][0] === param.name){

                        provinces.push(key);
                        break;
                    }
                }
            }
           //点击切换province视图 
           if (bmap) {
            // 更新bmap显示的数据
            showChinaData(provinces);
           }
           else if (map1) {
            //更新map1显示的数据
            showProvinceData(provinces);
           }
        })
    }
 
