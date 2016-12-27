
    var kwstorm_resp = {
        "status": "success",
        "params": {
            "q": "大數據,寶可夢",
            "tn": "大數據,pokemon",
            "min": "2016/09/10",
            "max": "2016/09/11",
            "type": "NEWS,SM,BBS,BLOG",
            "senti": "Positive, Negative, Neutral",
            "top_n": 12
        },
        "topic_info":{
            "name":"大數據,pokemon",
            "strength":"強烈",
            "volumn":1000
        }, 
        "data": [{
            "name": "精靈",
            "strength":"超級強烈",
            "volumn":2000,
            "value": 100
        }, {
            "name": "radar",
            "strength":"輕微",
            "volumn":10,
            "value": 80

        }, {
            "name": "手遊",
            "strength":"強烈",
            "volumn":900,
            "value": 80
        }, {
            "name": "攻略",
            "strength":"中度",
            "volumn":200,
            "value": 80
        }, {
            "name": "神奇寶貝大師",
            "strength":"輕微",
            "volumn":30,
            "value": 70
        }, {
            "name": "訓練",
            "strength":"中度",
            "volumn":400,
            "value": 50
        }, {
            "name": "稀有怪",
            "strength":"輕微",
            "volumn":140,
            "value": 40
        }, {
            "name": "小火龍",
            "strength":"輕微",
            "volumn":100,
            "value": 30
        }, {
            "name": "雷達",
            "strength":"輕微",
            "volumn":20,
            "value": 30
        }, {
            "name": "遊戲",
            "strength":"強烈",
            "volumn":600,
            "value": 20
        },{
            "name": "玩家",
            "strength":"強烈",
            "volumn":800,
            "value": 15
        },{
            "name": "新莊",
            "strength":"強烈",
            "volumn":1800,
            "value": 3
        }]
    }


    function chart_storm(resp) {
        console.log(resp);
        var textarr = resp.data.map(function(d,i){
            return d.name;
        });
        var volumn = resp.data.map(function(d,i){
            return d.volumn; 
        });
        var strength = resp.data.map(function(d,i){
            return d.strength; 
        });
        var topic_strength = resp.topic_info.strength;
        console.log(textarr,volumn, strength,topic_strength); 
       
        var series = [];

        var qs = resp.params.tn; 
        //fixed r
        var r_arr = function() {
            var arr = [];
            for (var i = 1; i < 13; i++) {
                if (i == 1) {
                    arr.push(60);
                } else {
                    arr.push(i * 47.5);
                }
            }
            return arr;
        }();
        console.log(r_arr);

        //var r = [60, 95, 142.5, 190, 237.5, 285, 332.5, 380, 427.5, 475, 522.5, 570];

        function correspond_r(textarr) {
            var basic = [1, 5, 9],
                valueIdx = [];
            for (var i = 0; i < textarr.length; i++) {
                if (i < 3) {
                    var value = basic[i];
                    valueIdx.push(value);
                }
                if (i >= 3 && i <= 5) {
                    var value = basic[i - basic.length] + 1;
                    valueIdx.push(value);
                }
                if (i >= 6 && i <= 8) {
                    var value = basic[i - basic.length * 2] + 2;
                    valueIdx.push(value);
                }
                if (i >= 9 && i <= 11) {
                    var value = basic[i - basic.length * 3] + 3;
                    valueIdx.push(value);
                }
            }
            valueIdx.sort(function(a, b) {
                return a - b;
            });
            console.log(valueIdx);
            return valueIdx;
        }

        var count_r = function() {
            var r = correspond_r(textarr).map(function(d, idx) {
                return r_arr[d - 1];
            });
            return r;
        }();
        
        console.log(count_r);

        function count(topic_strength, qs) {
            var x, y, r, max_x, color, s_strength, arr = [],
                circler = 15;
            //console.log(topic_strength,qs);
            var icon = fillicon(topic_strength);
            //console.log(icon);

            arr.push({
                x: 0,
                y: 0,
                r: 0,
                correlation: 0,
                strength: topic_strength,
                label: "",
                marker: {
                    symbol: icon
                }
            });

            for (var i = 1; i < textarr.length + 1; i++) {
                r = count_r[i - 1] - circler;
                label = textarr[i - 1];
                if (i % 3 == 1) {
                    max_x = r <= 180 ? r : 180;
                    x = Math.random() * (max_x - 20) + 20;
                    correlation = '高度相關';
                } else if (i % 3 == 2) {
                    max_x = r <= 350 ? r : 350;
                    x = Math.random() * (max_x - 20) + 20;
                    correlation = '中度相關';
                } else if (i % 3 == 0) {
                    max_x = r <= 540 ? r : 540;
                    x = Math.random() * (max_x - 20) + 20;
                    correlation = '低度相關';
                }
                s_strength = strength[i-1];
                icon = fillicon(s_strength);  
                y = Math.sqrt(r * r - x * x) * 480 / 570;
                arr.push({
                    x: x,
                    y: y,
                    r: r,
                    correlation: correlation,
                    strength: s_strength,
                    label: label,
                    marker: {
                        symbol: icon
                    }
                });
            }
            return arr;
        }


        var fillicon = function(strength) {
            var icon; 
            if (strength ==='超級強烈') {
                icon = 'url(imgs/chart_storm_red.png)';
            } else if (strength === '強烈') {
                icon = 'url(imgs/chart_storm_orange.png)';
            } else if ( strength === '中度') {
                icon = 'url(imgs/chart_storm_blue.png)';
            } else if (strength === '輕微') {
                icon = 'url(imgs/chart_storm_green.png)';
            }
            return icon;
        };

        var countdata = count(topic_strength, qs);
        console.log(countdata);

        $('#chart_storm').highcharts({
            chart: {
                type: 'scatter',
                zoomType: 'xy',
                animation: 5000,
                width: 760,
                height: 510,
                marginLeft:150,
                spacingLeft: 30,
                spacingBottom: 20,
                plotBackgroundImage: 'imgs/570x480px.jpg',
            },
            exporting: {
                sourceWidth: 915,
                sourceHeight: 765,
                enabled: false,
                scale: 1,
                chartOptions: {
                    xAxis: {
                        title: {
                            style: {
                                fontSize: '24px'
                            }
                        }
                    },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                style: {
                                    fontSize: '20px'
                                }
                            }
                        }
                    }
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                min: 0,
                max: 570,
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                labels: {
                    enabled: false
                },
                minorTickLength: 0,
                tickLength: 0,
                title: {
                    enabled: true,
                    text: qs.toString(),
                    align: 'low',
                    margin: 25,
                    x: 15,
                    style: {
                        fontSize: '15px',
                        color: 'black',
                        fontWeight: 'bold'
                    }
                },
                tickInterval: 50,
            },
            yAxis: {
                min: 0,
                max: 480,
                title: {
                    text: ''
                },
                tickInterval: 50,
                gridLineWidth: 0,
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                labels: {
                    enabled: false
                },
                minorTickLength: 0,
                tickLength: 0
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'bottom',
                x: 500,
                // y: 70,
                //floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                //borderWidth: 1
            },
            tooltip: {
                formatter: function() {
                    if (this.point.label == "") {
                        return false;
                    } else {
                        return '<b>' + this.point.label + '</b><br><p>' + this.point.correlation + '</p><br><p>' + this.point.strength + '</p>';
                    }
                }
            },
            plotOptions: {
                scatter: {
                    dataLabels: {
                        enabled: true,
                        y: -10,
                        style: {
                            textShadow: false
                        },
                        formatter: function() {
                            return this.point.label;
                        }
                    },
                    events: {
                        click: function() {
                            console.log(event.point.label);
                        }
                    },
                    series: {
                        animation: 5000,

                    }
                }
            },
            series: [{
                data: countdata,
            }]
        });
    }
    // end of storm in r17

