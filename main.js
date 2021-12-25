// Narrative Project - Author: Kathia Vargas Feliz
// Exploring Climate Change Data


import { Gauge} from "./Gauge.js";
//import { Sunburst} from "./Sunburst.js";
import {BarTop} from "./BarTop.js";
import {Line} from "./Line.js";
import {Heatmap} from "./Heatmap.js";


let sunburst;
let gauge;
let sunburst2;
let line;
let heatmap;
let barTop;

let state = {

  geojson: null,
  data: null,
  test: null,
  //sunburst: null,
  //gauge: null,
  //sunburst2: null,
  line: null,
  heatmap: null,
  barTop: null,
  
};

Promise.all([
  d3.csv("./data/sunburst.csv", d3.autoType),
  d3.csv("./data/greenhouse.csv", d3.autoType),
 
]).then(([test, bubble, sunburst, greenhouse]) => {
  //state.sunburst = sunburst;
  state.greenhouse = greenhouse;
  state.barTop = barTop;
  //state.sunburst2 = sunburst2;
  state.line = line;
 
   console.log("state: ", state);
  init();
});
  
function init(){
  //sunburst = new Sunburst(state, setGlobalState);
  heatmap = new Heatmap(state, setGlobalState);
  //gauge = new Gauge(state, setGlobalState);
  //sunburst2 = new Sunburst2(state, setGlobalState);
  line = new Line(state, setGlobalState);
  barTop = new BarTop(state, setGlobalState);
  
  console.log("table", test, sunburst);
  draw();
}

function draw() {
  console.log("test", sunburst, gauge, sunburst2, line);
  //sunburst.draw(state, setGlobalState);
  heatmap.draw(state, setGlobalState);
  //gauge.draw(state, setGlobalState);
  //sunburst2.draw(state, setGlobalState);
  line.draw(state, setGlobalState);
  barTop.draw(state, setGlobalState);
    
}

function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}