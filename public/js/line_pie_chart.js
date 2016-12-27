var linepie_data = {
    "status": "success",
    "params": {
        "q": "大數據&寶可夢",
        "tn": "大數據&pokemon",
        "min": "2016/09/10",
        "max": "2016/09/11",
        "type": "NEWS,SM,BBS,BLOG",
        "senti": "-1,0,1"
    },
    "data": [{
        "senti": "正面",
        "g": [30, 25, 50, 20, 33,45,22],
        "t": 225,
        "pc": "33%"
    }, {
        "senti": "中立",
        "g": [20, 30, 40, 40, 35,45,28],
        "t": 238,
        "pc": "35%"
    }, {
        "senti": "負面",
        "g": [20, 33, 41, 23, 25,35,27],
        "t": 211,
        "pc": "32%"
    }],
    "date": ["2016/12/01", "2016/12/02", "2016/12/03", "2016/12/04", "2016/12/05","2015/12/06","2015/12/07"]
}
var legendinfo = linepie_data.data.map(function(d, i) {
        return ({ "name": d.senti, "percentage": d.pc, "total": d.t });
    })
    //console.log(legendinfo); 

function linechart(alldata) {
    console.log(alldata);
    var series = alldata.data.map(function(d, i) {
        return ({ "name": d.senti, "data": d.g });
    })
    var date = alldata.date;
    console.log(series, date);
    Highcharts.setOptions({
        colors: ["#E5994E", "#87BDA3", "#3E6A85", "#8b0707", "#263645", "#aaaa11", "#22aa99", "#853785", "#66aa00", "#8A7F7D", "#d24675", "#D38A1B", "#42A881", "#D98179", "#008972"]
    });

    $('#linechart').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            height: 480,
        },
        exporting: {
            sourceWidth: 750,
            sourceHeight: 600,
            enabled: false,
            fallbackToExportServer: false
        },
        title: {
            text: '',
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            title: {
                text: '日期',
                margin: 20,
                style: {
                    fontSize: '15px'
                }
            },
            categories: date
        },
        yAxis: {
            title: {
                text: '聲量',
                margin: 20,
                style: {
                    fontSize: '15px'
                }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function() {
                return '<p>' + this.x + '</p><br><b>' + this.series.name + ": " + '</b>' + this.y + '<p>筆</p>';
            }
        },
        legend: {
            verticalAlign: 'top',
            layout: 'horizontal',
            align: 'center',
            //floating: true,
            borderWidth: 0,
            labelFormatter: function() {
                console.log(this.name);
                return '<span style="color: ' + this.color + '">' + this.name + '</span>';
            },
            itemMarginBottom: 40,
            itemStyle: {
                fontSize: '18px',
                fontWeight: 'normal'
            },
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                animation: {
                    duration: 2200
                },
                point: {
                    events: {
                        click: function() {
                            console.log(this.category, this.series.name);
                        }
                    }
                }
            }
        },
        series: series
    });
}
//end of highchart

function piechart(linechart_data) {
    var alldata = linechart_data.data.map(function(d, i) {
            return ({ "name": d.senti, "y": d.t });
        })
        //seriesdata = [];
    series = [{
        data: alldata,
        dataLabels: {
            verticalAlign: 'top',
            enabled: true,
            color: 'white',
            distance: -30,
            style: { textShadow: false },
            formatter: function() {
                return this.key;
            }
        }
    }];
    console.log(series);

    // Build the chart
    Highcharts.setOptions({
        colors: ["#E5994E", "#87BDA3", "#3E6A85"]
    });

    $('#piechart').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            width: 180,
            height: 180
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        tooltip: {
            formatter: function() {
                return '<b>' + this.key + ": " + '</b>' + this.y + '<p>筆</p>';
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            pie: {
                size: '120%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            },
            series: {
                animation: {
                    duration: 2200
                },
                point: {
                    events: {
                        click: function() {
                            console.log(this.name);
                        }
                    }
                }
            }
        },
        series: series
    });
}
