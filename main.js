// Narrative Project - Author: Kathia Vargas Feliz
// Exploring Climate Change Data

import { Test } from "./Test.js";
import { Bubble } from "./Bubble.js"
import { Gauge} from "./Gauge.js";
import { Sunburst} from "./Sunburst.js";
import {Sunburst2} from "./Sunburst2.js";


let test;
let bubble;
let gauge;
let sunburst;
let sunburst2;

let state = {

  geojson: null,
  data: null,
  test: null,
  bubble: null,
  gauge: null,
  sunburst: null,
  sunburst2: null,
  
};

Promise.all([
  d3.csv("./data/test.csv", d3.autoType),
  d3.csv("./data/bubble20.csv", d3.autoType),
 
]).then(([test, bubble]) => {
  state.test = test;
  state.bubble = bubble;
  state.gauge = gauge;
  state.sunburst = sunburst;
  state.sunburst2 = sunburst;
 
   console.log("state: ", state);
  init();
});
  
function init(){
  test = new Test(state, setGlobalState);
  bubble = new Bubble(state, setGlobalState);
  gauge = new Gauge(state, setGlobalState);
  sunburst = new Sunburst(state, setGlobalState);
  sunburst2 = new Sunburst2(state, setGlobalState);
  
  console.log("table", test);
  draw();
}

function draw() {
  console.log("test", test, bubble, gauge, sunburst, sunburst2);
  test.draw(state, setGlobalState);
  bubble.draw(state, setGlobalState);
  gauge.draw(state, setGlobalState);
  sunburst.draw(state, setGlobalState);
  sunburst2.draw(state, setGlobalState);
    
}

function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}