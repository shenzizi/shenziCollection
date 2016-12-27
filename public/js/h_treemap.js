
    var resp = {
        "status": "success",
        "params": {
            "q": "大數據,寶可夢",
            "tn": "大數據,pokemon",
            "min": "2016/09/10",
            "max": "2016/09/11",
            "type": "NEWS,SM,BBS,BLOG",
            "senti": "Positive, Negative, Neutral",
            "top_n": 10
        },
        "data": [{
            "name": "pokemon go",
            "value": 100
        }, {
            "name": "radar",
            "value": 80
        }, {
            "name": "熱潮",
            "value": 80
        }, {
            "name": "攻略",
            "value": 80
        }, {
            "name": "神奇寶貝大師",
            "value": 70
        }, {
            "name": "捕捉",
            "value": 50
        }, {
            "name": "稀有怪",
            "value": 40
        }, {
            "name": "全球",
            "value": 30
        }, {
            "name": "雷達",
            "value": 30
        }, {
            "name": "開放",
            "value": 20
        }]
    }

    function TreeMap(resp) {
        var treemap_color = ["#00c18a", "#efbb88", "#849596", "#83b4a6", "#afc1c2", "#74c1ab", "#b9e2cf", "#d6aa7e", "#91d3c0", "#a4e3e7"];

        var data = resp.data.map(function(obj, idx) {
            obj.color = treemap_color[idx];
            return obj;
        });
        console.log(data); 
        //console.log(reformattedArray);
        var series = [];
        series.push({
            type: "treemap",
            layoutAlgorithm: 'squarified',
            dataLabels: {
                padding: 20,
                style: {
                    textOverflow: "ellipsis",
                    fontSize: '15px',
                    textShadow: "none",
                    color: '#FFFFFF',
                }
            },
            data: data
        });

        console.log(series);
        $('#treemap').highcharts({
            credits: {
                enabled: false
            },
            exporting: {
                sourceWidth: 1130,
                sourceHeight: 500,
                scale: 1,
                enabled: false,
            },
            chart: {
                renderTo: 'treemap',
            },
            title: {
                text: '',
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                series: {
                    animation: {
                        duration: 2200,
                    },
                    point: {
                        events: {
                            click: function() {
                                var label = this.name;
                                console.log(label);
                            }
                        }
                    }
                }
            },
            series: series
        });
    }