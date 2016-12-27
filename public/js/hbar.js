    var leader_resp = {
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
        "categories": [
            "批踢踢 - GOSSIPING",
            "批踢踢 - C_CHAT",
            "自由電子報 - LTN",
            "雅虎新聞 - 娛樂",
            "批踢踢 - WOMENTALK",
            "蘋果日報 - 蘋果日報",
            "自由時報 - 即時新聞",
            "卡卡洛普 - GAMMEFORUM",
            "FACEBOOK - 蘋果日報",
            "PCHOME新聞 - 即時新聞",
            "其他"
        ],
        "series": [{
            "data": [
                311,
                123,
                36,
                18,
                12,
                13,
                13,
                5,
                12,
                9,
                283
            ],
            "name": "按讚次數",
            "legendIndex": 2
        }, {
            "data": [
                11,
                7,
                3,
                0,
                3,
                1,
                0,
                6,
                1,
                3,
                71
            ],
            "name": "被回文數",
            "legendIndex": 1
        }, {
            "data": [
                54,
                22,
                8,
                3,
                1,
                2,
                2,
                3,
                0,
                1,
                67
            ],
            "name": "發表次數",
            "legendIndex": 0
        }]
    }

    function h_bar(resp) {
        var leadername = resp.categories;
        var series = resp.series;
        console.log(series);
        // var order = total.sort(function(a, b) {
        //     return a - b;
        // });
        Highcharts.setOptions({
            colors: ["#E5994E", "#87BDA3", "#3E6A85", "#8b0707", "#263645", "#aaaa11", "#22aa99", "#853785", "#66aa00", "#8A7F7D", "#d24675", "#D38A1B", "#42A881", "#D98179", "#008972"]

        });

        $('#leaderchart').highcharts({
            credits: false,
            chart: {
                type: 'bar',
                height: 500,
                // events: {
                //     load: function() {
                //         this.renderer.image(watermark, 30, 760, 110, 23)
                //             .add();
                //     }
                // }
            },
            exporting: {
                sourceWidth: 1200,
                sourceHeight: 800,
                scale: 1,
                enabled: false
            },
            title: {
                text: '' //q + '之綜合分析'
            },
            xAxis: {
                categories: leadername
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal'
            },
            tooltip: {
                formatter: function() {
                    return '<p>' + this.x + '</p><br><b>' + this.series.name + ": " + '</b>' + this.y + '<p>筆</p>';
                }
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    events: {
                        click: function(e) {
                            //alert("hi");
                            console.log(this.name);
                            console.log(e.point.category);
                        }
                    }
                }
            },
            series: series
        });
    }
