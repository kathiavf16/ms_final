class Sunburst {

    constructor(state, setGlobalState) {

        // Code goes here
        const sunData = state.sunburst.map(d => ({
            "indicator": d.IndicatorName,
            "country": d.CountryName,
            "ecostatus": d.EcoStatus,
            "value": d.IndicatorValue,
            

        }))
        // grouping data
        let group = d3.group(sunData, d => d.indicator, d => d.ecostatus)
        //let hierarchy = d3.hierarchy(group)
        // debuging
        
        


        //console.log("sun: ", hierarchy)

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
        var svg = d3.select("#sunburst").append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1200 700")
            .classed("svg-content", true)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");
        d3.select(window)
            .on("resize", function () {
                var targetWidth = chart.node().getBoundingClientRect().width;
                chart.attr("width", targetWidth);
                chart.attr("height", targetWidth / aspect);
            });
        setTimeout(function () {
            var root = d3.hierarchy(group);
            root.sum(function (d) {
                return !d.children || d.children.length === 0 ? d.value : 0;
            });
            console.log("d", root); //
            svg.selectAll("path")
                .data(partition(root).descendants())
                .enter().append("path")
                .attr("d", arc)
                .style("fill", function (d) {
                    return color(d.data.country);
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
        
        console.log("menu:", menu);
    } //end of constructor

    draw(state, setGlobalState) {

    }
}

export {
    Sunburst
};