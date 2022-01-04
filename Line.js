class Line {

    constructor(state, setGlobalState) {

        // Code goes here
       const margin = {
               top: 100,
               right: 30,
               bottom: 30,
               left: 60
           },
           width = 660 - margin.left - margin.right,
           height = 500 - margin.top - margin.bottom;

       // append the svg object to the body of the page
       const svg = d3.select("#line")
           .append("svg")
           .attr("preserveAspectRatio", "xMinYMin meet")
               .attr("viewBox", "0 0 660 500")
               .classed("svg-content", true)
           .attr("width", width + margin.left + margin.right)
           .attr("height", height + margin.top + margin.bottom)
           .append("g")
           .attr("transform", `translate(${margin.left},${margin.top})`);


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
               .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])

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