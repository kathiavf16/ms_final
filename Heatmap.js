class Heatmap {

    constructor(state, setGlobalState) {

        // Code goes here
// set the dimensions and margins of the graph
const margin = {
        top: 150,
        right: 25,
        bottom: 80,
        left: 1300
    },
    width = 4550 - margin.left - margin.right,
    height = 5500 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#heatmap")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 4550 5500")
        .classed("svg-content", true)
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("data/greenhouse2.csv").then(function (data) {

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
        .style("font-size", 80)
        .style("color", "black")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    // Build Y scales and axis:
    const y = d3.scaleBand()
        .range([height, 0])
        .domain(myVars)
        .padding(0.40);
    svg.append("g")
        .style("font-size", 80)
        .style("color", "black")
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()

    // Build color scale
    const myColor = d3.scaleSequential()
        .interpolator(d3.interpolatePuBuGn)
        .domain([50000,100000,200000, 500000, 900000,1000000, 2000000,3000000,4000000, 5000000,120000000])

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
            .html( d.CountryName + " emitted " + d.IndicatorValue + " tonnes of " + d.IndicatorName + " in 2018")
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
            return myColor(d.IndicatorValue)
        })
        .style("stroke-width", 1)
        .style("stroke", "black")
        .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
})

/* // Add title to graph
svg.append("text")
    .attr("x", 0)
    .attr("y", -80)
    .attr("text-anchor", "left")
    .style("font-size", "50px")
    .text("Greenhouse Gas Emissions (CO2, N2O, & CH4)");
 */
// Add subtitle to graph
/* svg.append("text")
    .attr("x", 100)
    .attr("y", 20)
    .attr("text-anchor", "left")
    .style("font-size", "50px")
    .style("fill", "grey")
    .style("max-width", 1400)
    .text("Total # of emissions by country"); */
    } //end of constructor

    draw(state, setGlobalState) {



    }
}

export {
    Heatmap
};