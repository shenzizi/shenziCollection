    var cloud_resp = [{
        "name": "pokemon go",
        "value": 100
    }, {
        "name": "radar",
        "value": 80
    }, {
        "name": "手遊",
        "value": 80
    }, {
        "name": "攻略",
        "value": 80
    },  {
        "name": "玩家",
        "value": 75
    }, {
        "name": "官方",
        "value": 70
    }, {
        "name": "抓到",
        "value": 60
    }, {
        "name": "訓練",
        "value": 50
    }, {
        "name": "版本",
        "value": 40
    }, {
        "name": "交易",
        "value": 40
    }, {
        "name": "雷達",
        "value": 35
    }, {
        "name": "北投",
        "value": 35
    }, {
        "name": "精靈",
        "value": 30
    }, {
        "name": "小火龍",
        "value": 30
    }, {
        "name": "日本",
        "value": 22
    }, {
        "name": "蝦皮",
        "value": 20
    }, {
        "name": "稀有怪",
        "value": 20
    }, {
        "name": "App store",
        "value": 20
    },{
        "name": "神奇寶貝大師",
        "value": 15
    },{
        "name": "第二代",
        "value": 15
    },{
        "name": "太陽",
        "value": 10
    }]

    function d3wordcloud(resp) {
        console.log(resp);
        var tags = resp;
        var fill = ["#00c18a", "#efbb88", "#849596", "#83b4a6", "#afc1c2", "#74c1ab", "#d6aa7e", "#91d3c0", "#a4e3e7", "#92b3b5", "#99e4c1", "#c7ba7f", "#47ad90", "#75cbd0", "#97d391", "#c5b053", "#24a07d", "#616c6d", "#a5b073", "#9b872c", "#067a59", "#3b4d4e", "#9bb521", "#a97d07", "#1e8d38", "#286367", "#a1b34f", "#dd9e17", "#16969e", "#4d8b5b", "#c6702a", "#42b65d", "#9b872c", "#748d00", "#1f4829", "#943e0a", "#146928", "#816a02", "#263645", "#00c18a", "#efbb88", "#849596", "#83b4a6", "#afc1c2", "#74c1ab", "#b9e2cf", "#d6aa7e", "#91d3c0", "#a4e3e7", "#92b3b5", "#99e4c1", "#c7ba7f", "#47ad90", "#75cbd0", "#97d391", "#c5b053", "#24a07d", "#616c6d", "#a5b073", "#9b872c", "#067a59", "#3b4d4e", "#9bb521", "#a97d07", "#1e8d38", "#286367", "#a1b34f", "#dd9e17", "#16969e", "#4d8b5b", "#c6702a", "#42b65d", "#9b872c", "#748d00", "#1f4829", "#943e0a", "#146928", "#816a02", "#263645"];

        var w = $("#d3wordcloud").width(),
            h = $("#d3wordcloud").height() - 50;

        var width = w,
            height = h;
        console.log(w, h);
        //var w = 800; h = 500; 

        var max,
            fontSize;

        var layout = d3.layout.cloud()
            .timeInterval(Infinity)
            .size([w, h])
            .fontSize(function(d) {
                return fontSize(+d.value);
            })
            .text(function(d) {
                return d.name;
            })
            .rotate(function(d) {
                return 0;
            })
            .on("end", draw);

        var svg = d3.select("#d3wordcloud").append("svg")
            .attr("width", w)
            .attr("height", h);


        //var vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");
        var vis = svg.append("g").attr("transform", "translate(" + w / 2 + ',' + (h / 2 + 20) + ")");

        update();

        window.onresize = function(event) {
            update();
        };

        function draw(data, bounds) {
            var w = $("#d3wordcloud").width(),
                h = $("#d3wordcloud").height();


            svg.attr("width", w).attr("height", h);

            scale = bounds ? Math.min(
                w / Math.abs(bounds[1].x - w / 2),
                w / Math.abs(bounds[0].x - w / 2),
                h / Math.abs(bounds[1].y - h / 2),
                h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

            var text = vis.selectAll("text")
                .data(data, function(d) {
                    // return d.text.toLowerCase();
                    return d.text;
                });
            text.transition()
                .duration(1000)
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("font-size", function(d) {
                    return d.size + "px";
                });
            text.enter().append("text")
                .attr("text-anchor", "middle")
                .attr("cursor", "pointer")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("font-size", function(d) {
                    return d.size + "px";
                })
                .style("opacity", 1e-6)
                .transition()
                .duration(1000)
                .style("opacity", 1);
            //.on("click", click)

            //text.on("click",function(d){console.log(d)});
            text.on("click", click);

            text.style("font-family", function(d) {
                    return '微軟正黑體';
                })
                .style("fill", function(d, i) {
                    return fill[i];
                })
                .text(function(d) {
                    return d.text;
                });

            //vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
            vis.transition().attr("transform", "translate(" + w / 2 + ',' + (h / 2 + 20) + ")scale(" + scale + ")");
        }

        function update() {
            layout.font('impact').spiral('archimedean');
            //fontSize = d3.scale['sqrt']().range([20, 100]);
            fontSize = d3.scale['sqrt']().range([20, 120]);
            if (tags.length) {
                fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
            }
            layout.stop().words(tags).start();
        }

        function click(d) {
            var obj = d3.select(this);
            console.log(obj);
            var label = $(obj).text(); //|| decodeURIComponent(d3.select(this).attr('id')) ;
            console.log(label);
            $scope.$apply(function() {
                $scope.printTable(label);
            });
            $("html, body").animate({
                scrollTop: $(document).height()
            }, 1000);
            //location.replace("#" + encodeURIComponent(d === activeTopic ? "!" : d.name));
            d3.event.preventDefault();
        }

    }
    //end of d3 wordcloud
