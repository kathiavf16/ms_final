// Narrative Project - Author: Kathia Vargas Feliz
// Exploring Climate Change Data

import {Line} from "./Line.js";
import {Heatmap} from "./Heatmap.js";

let line;
let heatmap;

let state = {

  line: null,
  heatmap: null,
  
};

Promise.all([
  d3.csv("./data/sunburst.csv", d3.autoType),
  d3.csv("./data/greenhouse.csv", d3.autoType),
  d3.csv("./data/top.csv", d3.autoType),
 
]).then(([test, bubble, sunburst, greenhouse, barTop]) => {
  state.line = line;
  state.greenhouse = greenhouse;
  state.barTop = barTop;
  
 
   console.log("state: ", state);
  init();
});
  
function init(){
  heatmap = new Heatmap(state, setGlobalState);
  line = new Line(state, setGlobalState);
  
  console.log("table", sunburst);
  draw();
}

function draw() {
  console.log("test",line, heatmap);
  heatmap.draw(state, setGlobalState);
  line.draw(state, setGlobalState);
    
}

function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}