//source: https://www.d3-graph-gallery.com/graph/circularpacking_drag.html - Draggable circular packing in d3.js


class Bubble {

    constructor(state, setGlobalState) {
      
      this.width = 500;
      this.height = 600;

      this.svg = d3.select("#bubble")
      .append("svg")
      .attr("height", this.height)
      .attr("width", this.width)

      this.defs = this.svg.append("defs");

      this.defs.append("pattern")
      .attr('id', 'logo')
      .attr('patternContentUnits', 'objectBoundingBox')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('image')
      .attr('xlink:href', "img/one.jpg")
      .attr("preserveAspectRadio", "none")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr('width', 1)
      .attr('height', 1)
      
    }
  
    draw(state, setGlobalState) {

      const size = d3.scaleLinear().domain(d3.extent(state.bubble, d => d.sizes)).range([90,50]);
      const tooltip = d3.select("body").append("div").attr("class", "toolTip");
      
      const mousemove = function(d) {
        tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html((d.pull + " has been involved in " + d.sizes + 
            " accidents" + " with " + d.sizes + " fatalities"));}
  

      this.defs.selectAll(".logo-pattern")
      .data(state.bubble)
      .enter().append("pattern")
      .attr("class", "logo-pattern")
      .attr('id', function(d){return d.pullid})
      .attr('patternContentUnits', 'objectBoundingBox')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('image')
      .attr('xlink:href', function(d) {return d.path})
      .attr("preserveAspectRadio", "none")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr('width', 1)
      .attr('height', 1)

      var node = this.svg.append("g")
      .attr("transform", "translate(0,0)")
      .selectAll("circle")
      .data(state.bubble)
      .enter()
      .append("circle")
      .attr("r", function(d){ return size(d.sizes)})
      .attr("cx", this.width / 2)
      .attr("cy", this.height / 2)
      .style("fill", function(d) { return "url(#" + d.pullid + ")"})
      //.style("fill-opacity", 0.3)
      .attr("stroke", "lightyellow")
      .style("stroke-width", 4)
      .on("mouseover", mousemove)
      .on("mouseout", function() {tooltip.style("display", "none");})
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));
      
      

      d3.select("#commercial").on("click", function(){
        console.log("hey","you click me")
        }) 
      
      var simulation = d3.forceSimulation()
     .force("center", d3.forceCenter().x( this.width / 2).y(this.height / 2)) // Attraction to the center of the svg area
     .force("charge", d3.forceManyBody().strength(0.05)) // Nodes are attracted one each other of value is > 0
     .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return size(d.sizes)}).iterations(1)); // Force that avoids circle overlapping

     simulation
     .nodes(state.bubble)
     .on("tick", function(d){
      node
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
    });

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(.03).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(.03);
      d.fx = null;
      d.fy = null;
    }
      
    }
  }
  
  export { Bubble };