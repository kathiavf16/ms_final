// Narrative Project - Author: Kathia Vargas Feliz
// Airplane Crashes and Fatalities

import { Test } from "./Test.js";


let test;

let state = {

  geojson: null,
  data: null,
  test: null,
  
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
  
  console.log("table", chart);
  draw();
}

function draw() {
  console.log("test", test);
  chart.draw(state, setGlobalState);
    
}

function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}