    function d3_bubble_trend() {
        function truncate(str, maxLength, suffix) {
            if (str.length > maxLength) {
                str = str.substring(0, maxLength + 1);
                str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
                str = str + suffix;
            }
            return str;
        }

        var margin = {
                top: 20,
                right: 200,
                bottom: 0,
                left: 150
            },
            width = 520,
            height = 350;

        var start_year = 2008,
            end_year = 2016;

        var c =  ["#00c18a", "#efbb88", "#849596", "#83b4a6", "#afc1c2", "#74c1ab", "#b9e2cf", "#d6aa7e", "#91d3c0", "#a4e3e7"];

        var x = d3.scale.linear()
            .range([0, width]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("top");

        var formatYears = d3.format("0000");
        xAxis.tickFormat(formatYears);

        var svg = d3.select("#bubbletrend").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("margin-left", margin.left + "px")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = [{
            "articles": [
                [2008, 166],
                [2009, 100],
                [2010, 105],
                [2011, 110],
                [2012, 230],
                [2013, 130],
                [2014, 30],
                [2015, 40],
                [2016, 500]
            ],
            "total": 51,
            "name": "批踢踢-漫畫聊天版"
        }, {
            "articles": [
                [2008, 106],
                [2009, 50],
                [2010, 65],
                [2011, 30],
                [2012, 230],
                [2013, 100],
                [2014, 30],
                [2015, 140],
                [2016, 300]
            ],
            "total": 35,
            "name": "批踢踢-二手遊戲買賣版"
        }, {
            "articles": [
                [2008, 206],
                [2009, 150],
                [2010, 65],
                [2011, 30],
                [2012, 130],
                [2013, 80],
                [2014, 30],
                [2015, 140],
                [2016, 350]
            ],
            "total": 35,
            "name": "批踢踢-八卦版"
        }, {
            "articles": [
                [2008, 56],
                [2009, 150],
                [2010, 65],
                [2011, 30],
                [2012, 140],
                [2013, 80],
                [2014, 30],
                [2015, 140],
                [2016, 250]
            ],
            "total": 34,
            "name": "批踢踢-寶可夢"
        }, {
            "articles": [
                [2008, 206],
                [2009, 150],
                [2010, 65],
                [2011, 30],
                [2012, 130],
                [2013, 80],
                [2014, 30],
                [2015, 140],
                [2016, 310]
            ],
            "total": 26,
            "name": "批踢踢-寶可夢go"
        }, {
            "articles": [
                [2008, 256],
                [2009, 150],
                [2010, 65],
                [2011, 30],
                [2012, 100],
                [2013, 30],
                [2014, 130],
                [2015, 40],
                [2016, 340]
            ],
            "total": 23,
            "name": "批踢踢-代買版"
        }, {
            "articles": [
                [2008, 256],
                [2009, 150],
                [2010, 65],
                [2011, 30],
                [2012, 100],
                [2013, 30],
                [2014, 130],
                [2015, 40],
                [2016, 320]
            ],
            "total": 22,
            "name": "DCARD-寶可夢"
        }, {
            "articles": [
                [2008, 256],
                [2009, 150],
                [2010, 65],
                [2011, 30],
                [2012, 100],
                [2013, 30],
                [2014, 130],
                [2015, 40],
                [2016, 50]
            ],
            "total": 21,
            "name": "FACEBOOK-陶晶瑩"
        }, {
            "articles": [
                [2008, 156],
                [2009, 150],
                [2010, 65],
                [2011, 30],
                [2012, 100],
                [2013, 30],
                [2014, 130],
                [2015, 40],
                [2016, 250]
            ],
            "total": 18,
            "name": "蘋果日報-最新"
        }, {
            "articles": [
                [2008, 100],
                [2009, 150],
                [2010, 65],
                [2011, 30],
                [2012, 100],
                [2013, 30],
                [2014, 130],
                [2015, 40],
                [2016, 150]
            ],
            "total": 17,
            "name": "蕃薯藤-總覽"
        }]

        //d3.json("journals_optogenetic.json", function(data) {
        x.domain([start_year, end_year]);
        var xScale = d3.scale.linear()
            .domain([start_year, end_year])
            .range([0, width]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + 0 + ")")
            .call(xAxis);

        for (var j = 0; j < data.length; j++) {
            var g = svg.append("g").attr("class", "journal");

            var circles = g.selectAll("circle")
                .data(data[j]['articles'])
                .enter()
                .append("circle");

            var text = g.selectAll("text")
                .data(data[j]['articles'])
                .enter()
                .append("text");

            var rScale = d3.scale.linear()
                .domain([0, d3.max(data[j]['articles'], function(d) {
                    return d[1];
                })])
                .range([2, 15]);

            circles
                .attr("cx", function(d, i) {
                    return xScale(d[0]);
                })
                .attr("cy", j * 30 + 25)
                .attr("r", function(d) {
                    return rScale(d[1]);
                })
                .style("fill", function(d) {
                    return c[j];
                });

            text
                .attr("y", j * 30 + 30)
                .attr("x", function(d, i) {
                    return xScale(d[0]) - 5;
                })
                .attr("class", "value")
                .text(function(d) {
                    return d[1];
                })
                .style("fill", function(d) {
                    return c[j];
                })
                .style("display", "none");

            g.append("text")
                .attr("y", j * 30 + 30)
                .attr("x", -150)
                .attr("class", "label")
                .text(truncate(data[j]['name'], 30, "..."))
                .style("fill", function(d) {
                    return c[j];
                })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout);
        };

        function mouseover(p) {
            var g = d3.select(this).node().parentNode;
            d3.select(g).selectAll("circle").style("display", "none");
            d3.select(g).selectAll("text.value").style("display", "block");
        }

        function mouseout(p) {
            var g = d3.select(this).node().parentNode;
            d3.select(g).selectAll("circle").style("display", "block");
            d3.select(g).selectAll("text.value").style("display", "none");
        }
    }