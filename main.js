// Narrative Project - Author: Kathia Vargas Feliz
// Airplane Crashes and Fatalities

import { Test } from "./Test.js";
import { Bubble } from "./Bubble.js";
import {Gauge} from "./Gauge.js";

let test;
let bubble;
let gauge;

let state = {

  geojson: null,
  data: null,
  test: null,
  bubble: null,
  gauge: null,
  
};

Promise.all([
  d3.csv("../data/test.csv", d3.autoType),
  //d3.csv("../Data/causes.csv", d3.autoType),
 
]).then(([test]) => {
  state.test = test;
  //state.causes = causes;
 
   console.log("state: ", state);
  init();
});
  
function init(){
  chart = new Test(state, setGlobalState);
  bubble = new Bubble(state, setGlobalState);
  gauge = new Gauge(state, setGlobalState);
  
  console.log("table", chart);
  draw();
}

function draw() {
  console.log("test", test);
  chart.draw(state, setGlobalState);
  bubble.draw(state, setGlobalState);
  gauge.draw(state, setGlobalState);
    
}

function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}