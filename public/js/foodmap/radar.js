function radar(metricConfiguration) {

    var metrics = metricConfiguration,
        margin = 0,
        radius = 60,
        pointRadius = 3,
        labelOffset = radius + 10,
        maxLimit = 5.0,
        animSpeed = 300;

    function chart(selection) {

        var side = (radius + margin) * 2,
            pointCount = 0;

        selection.each(function(data) {

            // Compute configuration
            metrics = metrics.map(function(metric, i) {

                metric.scale = d3.scale.linear()
                    .range([0, radius])
                    .domain(metric.domain);

                metric.angle = 2 * Math.PI * i / metrics.length - Math.PI / 2;

                return metric;
            });

            // Augment data
            data = data.map(function(d) {

                d.points = metrics.map(function(metric) {

                    var origX = metric.scale(d.rate[metric.metric]);

                    return {
                        'x': origX * Math.cos(metric.angle),
                        'y': origX * Math.sin(metric.angle),
                        'label': d.rate[metric.metric] + '/' + metric.domain[1],
                        'id': pointCount++
                    };

                });

                return d;

            });

            //console.log(data,data[0].id);

            // Select the svg element, if it exists.
            // var svg = d3.select(this).selectAll('svg').data([metrics]);
            d3.select(".radarchart svg").remove();
            var radar_class = "radarchart" + data[0].id; 
            var svg = d3.select(this).selectAll('.radarchart').data([metrics]);

            // Otherwise, create the skeletal chart.
            svg.enter()
                .append('svg')
                .append('g')
                .attr("class",radar_class)
                // .attr("class", function(d) { console.log(d);
                //     return "radarchart" + d.id })
                .attr('transform', 'translate(' + (side / 2) + ', ' + (side / 2) + ')'); //center chart
            var g = svg.select("g");

            // Update the outer dimensions.
            svg.attr('width', side)
                .attr('height', side);

            // Generate cosmetic background
            chart.drawBackground(g);

            // Generate axis
            g.selectAll('.axis')
                .data(function(d) {
                    return d;
                })
                .enter()
                .append('g')
                .attr('class', 'axis')
                .each(function(d) {

                    d3.select(this).append('g')
                        .attr('class', d.metric + ' axisScale')
                        .attr('transform', 'rotate(' + (d.angle * 180 / Math.PI) + ')')
                        .call(d3.svg.axis().scale(d.scale));

                    chart.drawAxisLabel(d3.select(this));
                });

            // Add actual data
            var r = g.selectAll('.radar')
                .data(data);
            r.enter()
                .append('g')
                .attr('class', function(d, i) {
                    return 'radarArea radar radar' + i;
                });
            r.each(function(d, n) {
                chart.drawArea(d3.select(this));
            });

        });
    }

    chart.radius = function(_) {
        if (!arguments.length) {
            return radius;
        }
        radius = _;
        return chart;
    };

    chart.margin = function(_) {
        if (!arguments.length) {
            return margin;
        }
        margin = _;
        return chart;
    };

    chart.pointRadius = function(_) {
        if (!arguments.length) {
            return pointRadius;
        }
        pointRadius = _;
        return chart;
    };

    chart.drawBackground = function(selection) {

        var step = radius / maxLimit;

        selection.selectAll('.background')
            .data(d3.range(step, step * (maxLimit + 1), step).reverse())
            .enter()
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('class', 'background')
            .attr('r', function(d) {
                console.log(d);
                return d;
            });
    };

    chart.drawAxisLabel = function(selection) {

        selection.append('text')
            .text(function(d) {
                return d.label;
            })
            .attr('class', 'axisLabel')
            .attr('x', function(d) {

                var pos = labelOffset * Math.cos(d.angle);

                if (Math.PI / 2 === Math.abs(d.angle)) {
                    pos -= this.getComputedTextLength() / 2;
                } else if (Math.abs(d.angle) > Math.PI / 2) {
                    pos -= this.getComputedTextLength();
                }

                return pos;
            })
            .attr('y', function(d) {
                return (labelOffset * Math.sin(d.angle)) + 4;
            });
    };

    chart.drawArea = function(selection) {

        var rPath = selection.select(".radarPath");
        if (rPath.empty()) {
            selection.append('path')
                .attr('class', 'radarPath');
            rPath = selection.select(".radarPath");
        }
        rPath.transition()
            .duration(animSpeed)
            .attr('d', function(d) {
                return d3.svg.line()
                    .x(function(d) {
                        return d.x;
                    })
                    .y(function(d) {
                        return d.y;
                    })
                    .interpolate('linear-closed')
                    (d.points);
            })

        var rPoints = selection.selectAll('.radarPoint')
            .data(function(d) {
                return d.points;
            });
        rPoints.enter()
            .append('circle');
        rPoints.transition()
            .duration(animSpeed)
            .attr('cx', function(d) {
                return d.x;
            })
            .attr('cy', function(d) {
                return d.y;
            })
            .attr('r', pointRadius)
            .attr('class', 'radarPoint')
            .attr('id', function(d) {
                return 'radarPoint' + d.id;
            });

    };

    return chart;
}

var chart = radar(radar_data)
    .radius(60)
    .margin(30)
    .pointRadius(2);

// function rndData() {
//     return [{
//         "label": "A",
//         "rate": {
//             "a": 3.50,
//             "b": 2.75,
//             "c": 4.00,
//         }
//     }];
// }


function radar_refresh(foodid) {
    var data = rndData.filter(function(d) {
        return d.id === foodid });
    console.log(data);
    console.log($(".radarchart"));
    d3.select(".radarchart")
        .datum(data)
        .call(chart);
}
