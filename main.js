// Narrative Project - Author: Kathia Vargas Feliz
// Exploring Climate Change Data

import { Test } from "./Test.js";
import { Bubble } from "./Bubble.js"
//import { Gauge} from "./Gauge.js";
//import { Sunburst} from "./Sunburst.js";
//import {Sunburst2} from "./Sunburst2.js";
import {Line} from "./Line.js";
import {Heatmap} from "./Heatmap.js";


let test;
let bubble;
let sunburst;
let gauge;
let sunburst2;
let line;
let heatmap;

let state = {

  geojson: null,
  data: null,
  test: null,
  bubble: null,
  //sunburst: null,
  //gauge: null,
  //sunburst2: null,
  line: null,
  heatmap: null,
  
};

Promise.all([
  d3.csv("./data/test.csv", d3.autoType),
  d3.csv("./data/bubble20.csv", d3.autoType),
  d3.csv("./data/sunburst.csv", d3.autoType),
  d3.csv("./data/greenhouse.csv", d3.autoType),
 
]).then(([test, bubble, sunburst, greenhouse]) => {
  state.test = test;
  state.bubble = bubble;
  //state.sunburst = sunburst;
  state.greenhouse = greenhouse;
  //state.gauge = gauge;
  //state.sunburst2 = sunburst2;
  state.line = line;
 
   console.log("state: ", state);
  init();
});
  
function init(){
  test = new Test(state, setGlobalState);
  bubble = new Bubble(state, setGlobalState);
  //sunburst = new Sunburst(state, setGlobalState);
  heatmap = new Heatmap(state, setGlobalState);
  //gauge = new Gauge(state, setGlobalState);
  //sunburst2 = new Sunburst2(state, setGlobalState);
  line = new Line(state, setGlobalState);
  
  console.log("table", test, sunburst);
  draw();
}

function draw() {
  console.log("test", test, bubble, sunburst, gauge, sunburst2, line);
  test.draw(state, setGlobalState);
  bubble.draw(state, setGlobalState);
  //sunburst.draw(state, setGlobalState);
  heatmap.draw(state, setGlobalState);
  //gauge.draw(state, setGlobalState);
  //sunburst2.draw(state, setGlobalState);
  line.draw(state, setGlobalState);
    
}

function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}