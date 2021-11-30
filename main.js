// Narrative Project - Author: Kathia Vargas Feliz
// Airplane Crashes and Fatalities

import { Test } from "./Test.js";
import { Bubble } from "./Bubble.js"
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
  d3.csv("./data/test.csv", d3.autoType),
  d3.csv("./data/bubble20.csv", d3.autoType),
 
]).then(([test, bubble]) => {
  state.test = test;
  state.bubble = bubble;
  state.gauge = gauge;
 
   console.log("state: ", state);
  init();
});
  
function init(){
  test = new Test(state, setGlobalState);
  bubble = new Bubble(state, setGlobalState);
  gauge = new Gauge(state, setGlobalState);
  
  console.log("table", test);
  draw();
}

function draw() {
  console.log("test", test, bubble, gauge);
  test.draw(state, setGlobalState);
  bubble.draw(state, setGlobalState);
  gauge.draw(state, setGlobalState);
    
}

function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}