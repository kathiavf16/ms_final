class Gauge {

    constructor(state, setGlobalState) {

        // Code goes here

        var data = [
            40, 20, 30, 30
        ];
        var text = "";

        var width = 260;
        var height = 260;
        var thickness = 50;
        var duration = 0;

        var radius = Math.min(width, height) / 2;
        var color = d3.scaleOrdinal()
            .domain([0, 1])
            .range(["red", "blue", "green"])

        var anglesRange = 0.5 * Math.PI;

        var svg = d3.select("#gauge")
            .append('svg')
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 280 500")
            .classed("svg-content", true)
            .attr('class', 'pie');


        var g = svg.append('g')
            .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

         var arc = d3.arc()
             .innerRadius(radius - thickness)
             .outerRadius(radius);

         var pie = d3.pie()
             .value(function (d) {
                 return d;
             })
             .sort(null)
             .startAngle(anglesRange * -1)
             .endAngle(anglesRange);

         var path = g.selectAll('path')
             .data(pie(data))
             .enter()
             .append("g")

             .append('path')
             .attr('d', arc)
             .attr('fill', (d, i) => color(i))
             .each(function (d, i) {
                 this._current = i;
             });

          g.append('text')
              .attr('text-anchor', 'middle')
              .attr('dy', '.35em')
              .text('70%');


    }

    draw(state, setGlobalState) {

           

    }
}

export {
    Gauge
};