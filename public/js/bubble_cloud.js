var data = {};

// (function() {
data.topics = [
        { name: "蝦皮", x: 7, y: 307, count: 11 },
        { name: "蠶絲", x: 677, y: 127, count: 23 },
        { name: "radar", x: 414, y: 100, count: 90 },
        { name: "手遊", x: 677, y: 257, count: 77 },
        { name: "凍膜", x: 345, y: 120, count: 50 },
        { name: "Pokemon", x: 374, y: 220, count: 150 },
        { name: "稀有怪", x: 340, y: 227, count: 5 },
        { name: "手機", x: 598, y: 309, count: 57 },
        { name: "Taiwan", x: 643, y: 316, count: 33 },
        { name: "日本", x: 549, y: 289, count: 40 },
        { name: "分級", x: 398, y: 309, count: 66 },
        { name: "網友", x: 643, y: 316, count: 33 },
        { name: "大師", x: 549, y: 289, count: 40 }
    ]
    // })();

function d3_bubble_cloud() {

    var width = 850,
        height = 500;

    var padding = 4, // collision padding
        maxRadius = 100, // collision search radius
        maxMentions = 100, // limit displayed mentions
        activeTopic; // currently-displayed topic


    var r = d3.scale.sqrt()
        .domain([0, d3.max(data.topics, function(d) {
            return d.count;
        })])
        .range([10, maxRadius]);

    var force = d3.layout.force()
        .gravity(0)
        .charge(0)
        .size([width, height])
        .on("tick", tick);

    var node = d3.select(".g-nodes").selectAll(".g-node"),
        label = d3.select(".g-labels").selectAll(".g-label");

    d3.select(".g-nodes").append("rect")
        .attr("class", "g-overlay")
        .attr("width", width)
        .attr("height", height)
        .on("click", clear);

    d3.select(window)
        .on("hashchange", hashchange);

    d3.select("#g-form")
        .on("submit", submit);

    updateTopics(data.topics);
    hashchange();

    // Update the known topics.
    function updateTopics(topics) {
        topics.forEach(function(d, i) { d.r = Math.max(12, r(d.count)); }); // min. collision
        force.nodes(data.topics = topics).start();
        updateNodes();
        updateLabels();
    }

    // Update the displayed nodes.
    function updateNodes() {
        node = node.data(data.topics, function(d) {
            return d.name;
        });

        node.exit().remove();

        node.enter().append("a")
            .attr("class", "g-node")
            //.attr("xlink:href", function(d) { return "#" + encodeURIComponent(d.name); })
            .attr("id", function(d) {
                return encodeURIComponent(d.name);
            })
            .call(force.drag)
            .call(linkTopic)
            .append("g")
            .append("circle")

        node.select("circle")
            .attr("r", function(d) {
                return r(d.count);
            })
            .style("fill", function(d) {
                return d.count >= 40 ? "#74c1ab" : '#8ee6ca' });

    }

    // Update the displayed node labels.
    function updateLabels() {
        label = label.data(data.topics, function(d) {
            return d.name;
        });

        label.exit().remove();

        var labelEnter = label.enter().append("a")
            .attr("class", "g-label")
            .attr("id", function(d) {
                return encodeURIComponent(d.name);
            })
            .call(force.drag)
            .call(linkTopic);

        labelEnter.append("div")
            .attr("class", "g-name")
            .text(function(d) {
                return d.name;
            });

        labelEnter.append("div")
            .attr("class", "g-value");

        label
            .style("font-size", function(d) {
                return Math.max(8, r(d.count) / 2.2) + "px";
            })
            .style("width", function(d) {
                return r(d.count) * 2.5 + "px";
            });

        // Create a temporary span to compute the true text width.
        label.append("span")
            .text(function(d) {
                return d.name;
            })
            .each(function(d) { d.dx = Math.max(2.5 * r(d.count), this.getBoundingClientRect().width); })
            .remove();

        label
            .style("width", function(d) {
                return d.dx + "px";
            })
            .select(".g-value")
            .text(function(d) {
                return d.count + (d.r > 60 ? " mentions" : "");
            });

        // Compute the height of labels when wrapped.
        label.each(function(d) { d.dy = this.getBoundingClientRect().height; });
    }



    // Assign event handlers to topic links.
    function linkTopic(a) {
        a.on("click", click)
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);
    }


    // Simulate forces and update node and label positions on tick.
    function tick(e) {
        node
            .each(gravity(e.alpha * .1))
            .each(collide(.5))
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        label
            .style("left", function(d) {
                return (d.x - d.dx / 2) + "px";
            })
            .style("top", function(d) {
                return (d.y - d.dy / 2) + "px";
            });
    }

    // Custom gravity to favor a non-square aspect ratio.
    function gravity(alpha) {
        var cx = width / 2,
            cy = height / 2,
            ax = alpha / 4,
            ay = alpha;
        return function(d) {
            d.x += (cx - d.x) * ax;
            d.y += (cy - d.y) * ay;
        };
    }

    // Resolve collisions between nodes.
    function collide(alpha) {
        var q = d3.geom.quadtree(data.topics);
        return function(d) {
            var r = d.r + maxRadius + padding,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            q.visit(function(quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d) && d.other !== quad.point && d !== quad.point.other) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.r + quad.point.r + padding;
                    if (l < r) {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    }

    // Fisher–Yates shuffle.
    function shuffle(array) {
        var m = array.length,
            t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    // Update the active topic on hashchange, perhaps creating a new topic.
    function hashchange() {
        var name = decodeURIComponent(location.hash.substring(1)).trim();
        updateActiveTopic(name && name != "!" ? findOrAddTopic(name) : null);
    }

    // Trigger a hashchange on submit.
    function submit() {
        var name = this.search.value.trim();
        location.hash = name ? encodeURIComponent(name) : "!";
        this.search.value = "";
        d3.event.preventDefault();
    }

    // Clear the active topic when clicking on the chart background.
    function clear() {
        location.replace("#!");
    }

    // Rather than flood the browser history, use location.replace.
    function click(d) {
        location.replace("#" + encodeURIComponent(d === activeTopic ? "!" : d.name));
        d3.event.preventDefault();
    }

    // When hovering the label, highlight the associated node and vice versa.
    // When no topic is active, also cross-highlight with any mentions in excerpts.
    function mouseover(d) {
        node.classed("g-hover", function(p) {
            return p === d;
        });
        if (!activeTopic) d3.selectAll(".g-mention p").classed("g-hover", function(p) {
            return p.topic === d;
        });
    }

    // When hovering the label, highlight the associated node and vice versa.
    // When no topic is active, also cross-highlight with any mentions in excerpts.
    function mouseout(d) {
        node.classed("g-hover", false);
        if (!activeTopic) d3.selectAll(".g-mention p").classed("g-hover", false);
    }

};
