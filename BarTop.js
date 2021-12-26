class BarTop{

    constructor(state, setGlobalState) {

        // Code goes here
// set the dimensions and margins of the graph
const margin = {
        top: 10,
        right: 30,
        bottom: 90,
        left: 40
    },
    width = 260 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#bartop")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv("https://raw.githubusercontent.com/kathiavf16/ms_final/main/data/top_in.csv").then(function (data) {

    // X axis
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.CountryName))
        .padding(0.2);
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([574400, 10313460])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.CountryName))
        .attr("width", x.bandwidth())
        .attr("fill", "#69b3a2")
        // no bar at the beginning thus:
        .attr("height", d => height - y(0)) // always equal to 0
        .attr("y", d => y(0))

    // Animation
    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", d => y(d.IndicatorValue))
        .attr("height", d => height - y(d.IndicatorValue))
        .delay((d, i) => {
            console.log(i);
            return i * 100
        })

})

    } //end of constructor

    draw(state, setGlobalState) {

    }
}

export {
    BarTop
};