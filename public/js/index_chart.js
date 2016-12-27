function setChartSize() {
    var width = $("#chart").width(),
        height = h = $(window).height(),
        w = $(window).width(),
        h = $(window).height(),
        min_wh = Math.min(w, h);
    console.log(width, height, min_wh);

    var custom_oc = function() {
        if (w === 1024 & h === 768) {
            return 3;
        } else {
            return 2.5;
        }
    }();



    console.log(w, width, min_wh, custom_oc);

    var outer_circle = Math.min(height, width) / custom_oc,
        circle_length = 6,
        start_circle_r = Math.min(height, width) / 2 / 4.5,
        circle_add = (outer_circle - start_circle_r) / circle_length,
        start_angle = 0,
        angle_add = -180 / 5,
        angle_split = 6,
        inner_radius = start_circle_r,
        outer_radius = start_circle_r + circle_add * (circle_length - 1),
        circle_r = Math.min(height, width) / 120;

    return {
        'width': width,
        'height': height,
        'outer_circle': outer_circle,
        'circle_length': circle_length,
        'start_circle_r': start_circle_r,
        'circle_add': circle_add,
        'start_angle': start_angle,
        'angle_add': angle_add,
        'angle_split': angle_split,
        'inner_radius': inner_radius,
        'outer_radius': outer_radius,
        'circle_r': circle_r
    }
}

function count_orbitRadius_theta(s, c, l) {
    var arr = [];
    for (var i = 0; i < l; i++) {
        arr.push(s + c * i)
    }
    return arr;
}; // orbitRadius:start_circle_r, circle_add, circle_length 
//theta: start_angle, angle_add, angle_split




function semiCircle() {

    var Fan = setChartSize();

    var orbitRadius = count_orbitRadius_theta(Fan.start_circle_r, Fan.circle_add, Fan.circle_length);
    var theta = count_orbitRadius_theta(Fan.start_angle, Fan.angle_add, Fan.angle_split);

    console.log(orbitRadius, theta);
    console.log(Fan.width, Fan.outer_circle, Fan.outer_radius, Fan.inner_radius);


    // plotting 

    var svg = d3.select("#chart").append("svg")
        .attr("width", Fan.width)
        .attr("height", Fan.height)
        .append("g")
        .attr("transform", function() {
            return "translate(" + Fan.width / 2 + "," + Fan.height / 1.9 + ")";
        });

    var arc_pie = d3.svg.arc()
        .outerRadius(Fan.outer_radius)
        .innerRadius(Fan.inner_radius);

    var semi_arc_pie = d3.svg.arc()
        .outerRadius(Fan.outer_radius / 1.38)
        .innerRadius(Fan.inner_radius);

    var arc = d3.svg.arc()
        .innerRadius(function(d, i) {
            if (i === 0) {
                return (d - 120);
            } else if (i === 5) {
                return (d - 10)
            } else {
                return (d - 1);
            }

        })
        .outerRadius(function(d) {
            return d;
        })
        .startAngle(0)
        .endAngle(2 * Math.PI);

    var arcs = svg.append("g").attr("class", "arc_group")

    arcs.selectAll("path")
        .data(orbitRadius)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("id", function(d, i) {
            console.log('#p_' + i, d);
            return 'p_' + i;
        })
        //.attr("shape-rendering","geometricPrecision")
        .style("fill", function(d, i) {
            if (i === 0) {
                return '#8a0917';
            } else if (i === 5) {
                return '#8a0917';
            } else {
                return 'hotpink';
            }
            //return i % 2 == 0 ? ' #cfd0d1' : 'transparent';
        })

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) {
            console.log(d.value);
            return d.value;
        })
        .startAngle(0)
        .endAngle(2 * Math.PI);

    var semipie_up = d3.layout.pie()
        .sort(null)
        .value(function(d) {
            console.log(d.value);
            return d.value;
        })
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2);

    var semipie_down = d3.layout.pie()
        .sort(null)
        .value(function(d) {
            console.log(d.value);
            return d.value;
        })
        .startAngle(Math.PI / 2)
        .endAngle(1.5 * Math.PI);



    var fans = svg.append("g").attr("class", "fan_group")

    fans.selectAll("path")
        .data(pie(dataset))
        .enter()
        .append("path")
        .attr("d", arc_pie)
        .attr("stroke", "#8a0817")
        .attr("stroke-width", 1)
        .attr("fill", function(d) {
            return 'transparent';
        })
        // .style("opacity", ".5")
        .attr("id", function(d) {
            return d.data.legend;
        })
        .on("click", function(d) {
            if (Fan.width < 767) {
                console.log(d, d.data.link, "click,fan.width < 767");
                window.location = d.data.link;
            }
        });

    var semi_fan_up = svg.append("g").attr("class", "semifan_up")

    semi_fan_up.selectAll("path")
        .data(semipie_up(semi_dataset))
        .enter()
        .append("path")
        .attr("d", semi_arc_pie)
        .attr("fill", function(d) {
            return '#8a0917';
        })
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        //.style("opacity", ".5")
        .attr("id", function(d) {
            return d.data.legend;
        })
        .on("click", function(d) {
            if (Fan.width < 767) {
                console.log(d, d.data.link, "click,fan.width < 767");
                window.location = d.data.link;
            }
        });
    var semi_fan_down = svg.append("g").attr("class", "semifan_down")

    semi_fan_down.selectAll("path")
        .data(semipie_down(semi_dataset))
        .enter()
        .append("path")
        .attr("d", semi_arc_pie)
        .attr("fill", function(d) {
            return 'lightgray';
        })
        .style("opacity", .5)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .attr("id", function(d) {
            return d.data.legend;
        })
        .on("click", function(d) {
            if (Fan.width < 767) {
                console.log(d, d.data.link, "click,fan.width < 767");
                window.location = d.data.link;
            }
        });


    var txt_around_cir = svg.append("g").attr("class", "txt_intro").style("fill", "black");
    txt_around_cir.selectAll("text")
        .data(txt_intro)
        .enter()
        .append("text")
        .attr("dx", Fan.inner_radius * 0.01)
        .attr("dy", Fan.inner_radius * 0.08)
        .style("font-size", function(d) {
            if (d.path === "#p_1") {
                return Math.min(Fan.width, Fan.height) < 670 ? 22 : 40;
            } else {
                return Math.min(Fan.width, Fan.height) < 670 ? 15 : 25;
            }

        })
        .style("text-anchor", "middle")
        .style("fill", function(d) {
            if (d.id === "txt_intro_notxt1") {
                return '#fff';
            } else {
                return '#8a0917';
            }
        })
        .append("textPath")
        .attr("xlink:href", function(d) {
            return d.path;
        })
        .attr("startOffset", function(d) {
            return d.angle;
        })
        .text(function(d) {
            return d.txt;
        })
        .style("cursor", function(d) {
            if (d.id !== "txt_intro_notxt1") {
                return "pointer";
            } else {
                return "default";
            }
        })
        .on("click", function(d) {
            window.open(d.link, '_blank');
        })
        .on("mouseover", function(d) {
            d3.select(this).style("font-weight", "bold")
                //alert("hi");
                // var id = "#" + d.id;
                // console.log(d, d.id, id);
                // $(".resume").fadeOut();
                // $(".intro").fadeIn("slow");
                // if (d.id !== 'txt_intro_notxt1') {
                //     $(".title h1").hide().html(d.txt).fadeIn(400);
                //     $(".intro_txt p").hide().html(d.id).fadeIn(600);
                //     $(".intro a").attr("href", d.link);
                // }

        })
        .on("mouseout", function(d) {
            d3.select(this).style("font-weight", "normal")
        })

    var resume_txt = svg.append("g").attr("class", "resume_txt");
    resume_txt.append("text")
        .attr('dx', -Fan.inner_radius / 2.2)
        .attr('dy', -Fan.inner_radius / 100)
        .text("Resume")
        .style("font-size", function(d) {
            return Math.min(Fan.width, Fan.height) < 670 ? 18 : 28;
        })
        .style("cursor", "pointer")
        // .on("mouseover", function(d) {
        //     $(".intro").fadeOut("slow");
        //     $(".resume").fadeIn("slow");
        // })

    function getPointX(theta, r) {
        return r * Math.cos(theta / 180 * Math.PI);
    }

    function getPointY(theta, r) {
        return r * Math.sin(theta / 180 * Math.PI);
    }


}

function redraw() {
    $("svg").remove();
    semiCircle();
    var chart_margin = function() {
        var w = $(window).width();
        if (w >= 1500) {
            return "-38%";
        } else if (w > 1024 && w < 1500) {
            return "-40%";
        } else {
            return "-45%";
        }
    }();
    console.log(chart_margin);
    $("#chart").css("margin-left", chart_margin);
    console.log("redraw")
}
