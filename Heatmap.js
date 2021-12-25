class Heatmap {

    constructor(state, setGlobalState) {

        // Code goes here
// set the dimensions and margins of the graph
const margin = {
        top: 80,
        right: 25,
        bottom: 30,
        left: 160
    },
    width = 650 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#heatmap")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/kathiavf16/ms_final/main/data/greenhouse.csv").then(function (data) {

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    const myGroups = Array.from(new Set(data.map(d => d.IndicatorName)))
    const myVars = Array.from(new Set(data.map(d => d.CountryName)))
    console.log("group", myGroups, myVars)
    // Build X scales and axis,
    const x = d3.scaleBand()
        .range([0, width])
        .domain(myGroups)
        .padding(0.05);
    svg.append("g")
        .style("font-size", 15)
        .style("color", "black")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    const y = d3.scaleBand()
        .range([height, 0])
        .domain(myVars)
        .padding(0.05);
    svg.append("g")
        .style("font-size", 10)
        .style("color", "black")
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()

    // Build color scale
    const myColor = d3.scaleSequential()
        .interpolator(d3.interpolatePuBuGn)
        .domain([0, 32.0])

    // create a tooltip
    const tooltip = d3.select("#heatmap")
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
            .html("The exact value of<br>this cell is: " + d.tonnes_pc)
            .style("left", (event.x) / 2 + "px")
            .style("top", (event.y) / 2 + "px")
    }
    const mouseleave = function (event, d) {
        tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }

    // add the squares
    svg.selectAll()
        .data(data, function (d) {
            return d.group + ':' + d.CountryName;
        })
        .join("rect")
        .attr("x", function (d) {
            return x(d.IndicatorName)
        })
        .attr("y", function (d) {
            return y(d.CountryName)
        })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) {
            return myColor(d.tonnes_pc)
        })
        .style("stroke-width", 1)
        .style("stroke", "black")
        .style("opacity", 0.8)
        //.on("mouseover", mouseover)
        //.on("mousemove", mousemove)
        //.on("mouseleave", mouseleave)
})

// Add title to graph
svg.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text("A d3.js heatmap");

// Add subtitle to graph
svg.append("text")
    .attr("x", 0)
    .attr("y", -20)
    .attr("text-anchor", "left")
    .style("font-size", "14px")
    .style("fill", "grey")
    .style("max-width", 400)
    .text("A short description of the take-away message of this chart.");
    } //end of constructor

    draw(state, setGlobalState) {



    }
}

export {
    Heatmap
};