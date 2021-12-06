class Sunburst2 {

    constructor(state, setGlobalState) {

        // Code goes here
        var width = 800,
            height = 650,
            /* ww w. d e  m o 2  s  .  c  o  m*/
            radius = (Math.min(width, height) / 2) - 10;
        var x = d3.scaleLinear()
            .range([0, 2 * Math.PI]);
        var y = d3.scaleLinear()
            .range([0, radius]);
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var partition = d3.partition();
        var arc = d3.arc()
            .startAngle(function (d) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
            })
            .endAngle(function (d) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
            })
            .innerRadius(function (d) {
                return Math.max(0, y(d.y0));
            })
            .outerRadius(function (d) {
                return Math.max(0, y(d.y1));
            });
        var svg = d3.select("#sunburst2").append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1000 700")
            .classed("svg-content", true)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");
        d3.select(window)
            .on("resize", function () {
                var targetWidth = chart1.node().getBoundingClientRect().width;
                chart1.attr("width", targetWidth);
                chart1.attr("height", targetWidth / aspect);
            });
        setTimeout(function () {
            var root = d3.hierarchy(menu);
            root.sum(function (d) {
                return !d.children || d.children.length === 0 ? d.size : 0;
            });
            svg.selectAll("path")
                .data(partition(root).descendants())
                .enter().append("path")
                .attr("d", arc)
                .style("fill", function (d) {
                    return color((d.children ? d : d.parent).data.name);
                })
                .on("click", click)
                .append("title")
                .text(function (d) {
                    return d.data.name + "\n" + d.data.size;
                });
        }, 100);

        function click(d) {
            svg.transition()
                .duration(750)
                .tween("scale", function () {
                    var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                        yd = d3.interpolate(y.domain(), [d.y0, 1]),
                        yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
                    return function (t) {
                        x.domain(xd(t));
                        y.domain(yd(t)).range(yr(t));
                    };
                })
                .selectAll("path")
                .attrTween("d", function (d) {
                    return function () {
                        return arc(d);
                    };
                });
        }
        d3.select(self.frameElement).style("height", height + "px");
        var menu = {
            "@rid": "#45:11",
            "name": "menu",
            "size": 360,
            "children": [{
                    "@rid": "#45:2",
                    "name": "manage",
                    "size": 72,
                    "children": [{
                            "@rid": "#45:0",
                            "name": "business-drivers",
                            "size": 12,
                            "children": [{
                                "@rid": "#46:3",
                                "name": "add-business-driver",
                                "size": 12,
                                "children": []
                            }]
                        },
                        {
                            "@rid": "#46:2",
                            "name": "strategic-objectives",
                            "size": 12,
                            "children": [{
                                "@rid": "#45:4",
                                "name": "add-strategic-objective",
                                "size": 12,
                                "children": []
                            }]
                        },
                        {
                            "@rid": "#46:0",
                            "name": "business-targets",
                            "size": 12,
                            "children": [{
                                "@rid": "#45:5",
                                "name": "add-business-target",
                                "size": 12,
                                "children": []
                            }]
                        },
                        {
                            "@rid": "#46:1",
                            "name": "enablers",
                            "size": 12,
                            "children": [{
                                "@rid": "#46:4",
                                "name": "add-enabler",
                                "size": 12,
                                "children": []
                            }]
                        },
                        {
                            "@rid": "#45:1",
                            "name": "delivery-management-vehicles",
                            "size": 12,
                            "children": [{
                                "@rid": "#45:6",
                                "name": "add-delivery-management-vehicle",
                                "size": 12,
                                "children": []
                            }]
                        },
                        {
                            "@rid": "#45:3",
                            "name": "documents",
                            "size": 12,
                            "children": [{
                                "@rid": "#46:5",
                                "name": "add-document",
                                "size": 12,
                                "children": []
                            }]
                        }
                    ]
                },
                {
                    "@rid": "#46:6",
                    "name": "report",
                    "size": 72,
                    "children": [{
                            "@rid": "#45:7",
                            "name": "integrity",
                            "size": 6.545454545454546,
                            "children": []
                        },
                        {
                            "@rid": "#46:7",
                            "name": "performance",
                            "size": 6.545454545454546,
                            "children": [{
                                    "@rid": "#46:15",
                                    "name": "corporate-performance",
                                    "size": 1.090909090909091,
                                    "children": []
                                },
                                {
                                    "@rid": "#45:16",
                                    "name": "financial-performance",
                                    "size": 1.090909090909091,
                                    "children": []
                                },
                                {
                                    "@rid": "#46:16",
                                    "name": "business-target-context",
                                    "size": 1.090909090909091,
                                    "children": []
                                },
                                {
                                    "@rid": "#45:17",
                                    "name": "perspective-wheel",
                                    "size": 1.090909090909091,
                                    "children": []
                                },
                                {
                                    "@rid": "#46:17",
                                    "name": "delivery-wheel",
                                    "size": 1.090909090909091,
                                    "children": []
                                },
                                {
                                    "@rid": "#45:18",
                                    "name": "delivery-milestones",
                                    "size": 1.090909090909091,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "@rid": "#45:8",
                            "name": "analysis",
                            "size": 6.545454545454546,
                            "children": [{
                                    "@rid": "#46:18",
                                    "name": "tag-analysis",
                                    "size": 3.272727272727273,
                                    "children": []
                                },
                                {
                                    "@rid": "#45:19",
                                    "name": "keyword-analysis",
                                    "size": 3.272727272727273,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "@rid": "#46:11",
                            "name": "strategy-overview",
                            "size": 6.545454545454546,
                            "children": []
                        },
                        {
                            "@rid": "#45:12",
                            "name": "delivery-overview",
                            "size": 6.545454545454546,
                            "children": []
                        },
                        {
                            "@rid": "#45:13",
                            "name": "strategy-integrity",
                            "size": 6.545454545454546,
                            "children": []
                        },
                        {
                            "@rid": "#46:12",
                            "name": "realisation-map",
                            "size": 6.545454545454546,
                            "children": []
                        },
                        {
                            "@rid": "#46:13",
                            "name": "delivery-integrity",
                            "size": 6.545454545454546,
                            "children": []
                        },
                        {
                            "@rid": "#45:14",
                            "name": "business-integrity",
                            "size": 6.545454545454546,
                            "children": []
                        },
                        {
                            "@rid": "#46:14",
                            "name": "approval-audit",
                            "size": 6.545454545454546,
                            "children": []
                        },
                        {
                            "@rid": "#45:15",
                            "name": "user-connections",
                            "size": 6.545454545454546,
                            "children": []
                        }
                    ]
                },
                {
                    "@rid": "#46:8",
                    "name": "organisations",
                    "size": 72,
                    "children": [{
                            "@rid": "#45:10",
                            "name": "my-organisation-details",
                            "size": 36,
                            "children": []
                        },
                        {
                            "@rid": "#46:10",
                            "name": "organisations-directory",
                            "size": 36,
                            "children": [{
                                "@rid": "#46:19",
                                "name": "add-organisation",
                                "size": 36,
                                "children": []
                            }]
                        }
                    ]
                },
                {
                    "@rid": "#45:9",
                    "name": "people",
                    "size": 72,
                    "children": [{
                        "@rid": "#45:20",
                        "name": "staff",
                        "size": 72,
                        "children": [{
                            "@rid": "#46:20",
                            "name": "add-staff",
                            "size": 72,
                            "children": []
                        }]
                    }]
                },
                {
                    "@rid": "#46:9",
                    "name": "administration",
                    "size": 72,
                    "children": [{
                            "@rid": "#45:21",
                            "name": "user-management",
                            "size": 24,
                            "children": [{
                                "@rid": "#46:21",
                                "name": "create-login-account",
                                "size": 24,
                                "children": []
                            }]
                        },
                        {
                            "@rid": "#45:22",
                            "name": "screen-management",
                            "size": 24,
                            "children": [{
                                "@rid": "#46:22",
                                "name": "add-screen-management",
                                "size": 24,
                                "children": []
                            }]
                        },
                        {
                            "@rid": "#46:23",
                            "name": "language",
                            "size": 24,
                            "children": []
                        }
                    ]
                }
            ]
        };
    } //end of constructor

    draw(state, setGlobalState) {



    }
}

export {
    Sunburst2
};