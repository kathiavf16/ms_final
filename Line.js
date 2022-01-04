class Line {

    constructor(state, setGlobalState) {

        // Code goes here
       const margin = {
               top: 100,
               right: 30,
               bottom: 0,
               left: 60
           },
           width = 660 - margin.left - margin.right,
           height = 630 - margin.top - margin.bottom;

       // append the svg object to the body of the page
       const svg = d3.select("#line")
           .append("svg")
           .attr("preserveAspectRatio", "xMinYMin meet")
               .attr("viewBox", "0 0 660 630")
               .classed("svg-content", true)
           .attr("width", width + margin.left + margin.right)
           .attr("height", height + margin.top + margin.bottom)
           .append("g")
           .attr("transform", `translate(${margin.left},${margin.top})`);

           // select the svg area

           // create a list of keys
           var keys = ["CO2", "CH4", "N2O", "PM2.5"]

           // Usually you have a color scale in your chart already
           var color = d3.scaleOrdinal()
               .domain(keys)
               .range(d3.schemeSet1);

           // Add one dot in the legend for each name.
           var size = 20
           svg.selectAll("mydots")
               .data(keys)
               .enter()
               .append("rect")
               .attr("x", 10)
               .attr("y", function (d, i) {
                   return 0 + i * (size + 5)
               }) // 100 is where the first dot appears. 25 is the distance between dots
               .attr("width", size)
               .attr("height", size)
               .style("fill", function (d) {
                   return color(d)
               })

           // Add one dot in the legend for each name.
           svg.selectAll("mylabels")
               .data(keys)
               .enter()
               .append("text")
               .attr("x", 10 + size * 1.2)
               .attr("y", function (d, i) {
                   return 0 + i * (size + 5) + (size / 2)
               }) // 100 is where the first dot appears. 25 is the distance between dots
               .style("fill", function (d) {
                   return color(d)
               })
               .text(function (d) {
                   return d
               })
               .attr("text-anchor", "left")
               .style("alignment-baseline", "middle")


       //Read the data
       d3.csv("data/line.csv", function (d) {

               return {
                   year: d3.timeParse("%Y-%m-%d")(d.year),
                   mean: d.mean,
                   name: d.name
               }
           }, ).then(function (data) {

           // group the data: I want to draw one line per group
           const sumstat = d3.group(data, d => d.name); // snest function allows to group the calculation per level of a factor
           console.log("sum", sumstat);
           // Add X axis --> it is a date format
           const x = d3.scaleTime()
               .domain(d3.extent(data, function (d) {
                   return d.year;
               }))
               .range([0, width]);
           svg.append("g")
               .attr("transform", `translate(0, ${height})`)
               .call(d3.axisBottom(x).ticks(5));

           // Add Y axis
           const y = d3.scaleLinear()
               .domain([0, d3.max(data, function (d) {
                   return +d.mean;
               })])
               .range([height, 0]);
           svg.append("g")
               .call(d3.axisLeft(y));

           // color palette
           const color = d3.scaleOrdinal()
               .range(['#377eb8','#e41a1c', '#4daf4a', '#984ea3'])

           // Draw the line
           svg.selectAll(".line")
               .data(sumstat)
               .join("path")
               .attr("fill", "none")
               .attr("stroke", function (d) {
                   return color(d[0])
               })
               .attr("stroke-width", 3)
               .attr("d", function (d) {
                   return d3.line()
                       .x(function (d) {
                           return x(d.year);
                       })
                       .y(function (d) {
                           console.log(+d.mean)
                           return y(+d.mean);
                       })
                       (d[1])
               })

                

               // create a tooltip
               const tooltip = d3.select("#line")
                   .append("div")
                   .style("opacity", 0)
                   .attr("class", "tooltip")
                   .style("background-color", "white")
                   .style("border", "solid")
                   .style("border-width", "2px")
                   .style("border-radius", "5px")
                   .style("padding", "5px")

               // Three function that change the tooltip when user hover / move / leave a cell
               const mouseover = function (event, d) {
                   tooltip
                       .style("opacity", 1)
                   d3.select(this)
                       .style("stroke", "black")
                       .style("opacity", 1)
               }
               const mousemove = function (event, d) {
                   tooltip
                       .html(d.IndicatorValue + "The exact value of<br>this cell is: " + d.IndicatorValue)
                       .style("left", (event.x) / 2 + "px")
                       .style("top", (event.y) / 2 + "px")
               }
               const mouseleave = function (event, d) {
                   tooltip
                       .style("opacity", 0)
                   d3.select(this)
                       .style("stroke", "solid")
                       .style("opacity", 0.8)
               }

               

       })


           
            





       
    } //end of constructor

    draw(state, setGlobalState) {



    }
}

export {
    Line
};