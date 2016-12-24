function imgbar(foodid) {
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
            right: 20,
            bottom: 0,
            left: 80
        },
        width = 120,
        height = 150;

    var start_year = 1,
        end_year = 5;

    // var c = d3.scale.category20c();


    var x = d3.scale.linear()
        .range([0, width]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top")
        .tickFormat(d3.format("d"));
    //var formatYears = d3.format("0000");
    //xAxis.tickFormat(formatYears);

    d3.select(".imgbarchart").remove();
    var svg = d3.select(".imgbar").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class","imgbarchart")
        .style("margin-left", margin.left + "px")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // var data = jo_data;
    // console.log(data);
    console.log(foodid);
    var data01 = rank_data.filter(function(d) {return Object.keys(d) == foodid });
    var data = data01[0][foodid];
     console.log(data01,data);
    //d3.json("journals_optogenetic.json", function(data) {
    x.domain([start_year, end_year]);
    var xScale = d3.scale.linear()
        .domain([start_year, end_year])
        .range([0, width]);

    svg.append("g")
        .attr("class", "imgbar_xaxis")
        .attr("transform", "translate(0," + 0 + ")")
        .call(xAxis);

    for (var j = 0; j < data.length; j++) {
        var g = svg.append("g").attr("class", "journal");
        console.log(data[j]);
        var icons = g.selectAll("image")
            .data(data[j]['rank'])
            .enter()
            .append("svg:image")
            .attr("xlink:href", function(d) {
                console.log(data[j]);
                if (d[1] > 0) {
                    return data[j]['img'];
                } else {
                    return;
                }
            })
            .attr("width", 22)
            .attr("height", 22)

        var text = g.selectAll("text")
            .data(data[j]['rank'])
            .enter()
            .append("text");

        icons
            .attr("x", function(d, i) {
                return xScale(d[0]) - 15;
            })
            .attr("y", j * 30 - 5)

        g.append("text")
            .attr("y", j * 30 + 15)
            .attr("x", - 20)
            .attr("class", "imgbar_label")
            .text(truncate(data[j]['name'], 30, "..."))
            .style("font-size",14)
            .style("text-anchor", "end")
            .style("fill", function(d) {
                return '#ffd393';
            })
    };
}
