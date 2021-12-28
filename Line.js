class Line {

    constructor(state, setGlobalState) {

        // Code goes here
       const margin = {
               top: 10,
               right: 30,
               bottom: 30,
               left: 60
           },
           width = 660 - margin.left - margin.right,
           height = 400 - margin.top - margin.bottom;

       // append the svg object to the body of the page
       const svg = d3.select("#line")
           .append("svg")
           .attr("width", width + margin.left + margin.right)
           .attr("height", height + margin.top + margin.bottom)
           .append("g")
           .attr("transform", `translate(${margin.left},${margin.top})`);

       //Read the data
       d3.csv("https://raw.githubusercontent.com/kathiavf16/ms_final/main/data/line.csv", function (d) {
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
                   return d.mean;
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
               .attr("stroke-width", 1.5)
               .attr("d", function (d) {
                   return d3.line()
                       .x(function (d) {
                           return x(d.year);
                       })
                       .y(function (d) {
                           return y(+d.mean);
                       })
                       (d[1])
               })

       })
    } //end of constructor

    draw(state, setGlobalState) {



    }
}

export {
    Line
};