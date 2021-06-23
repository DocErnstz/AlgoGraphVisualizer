require("./css/index.css");
import {pathfinding, Clear} from "./SearchPath.js";
import "regenerator-runtime/runtime";

const {Cell} = require("./DataStructure.js"); 
var elements=document.getElementById('matrix').children;
const start = document.getElementById("start");
const cells = document.querySelectorAll(".col");
var start_point = new Cell(0,0);

document.getElementById("Visualizer").addEventListener("click", (e) => {
    pathfinding(start_point, new Cell(2,2));
});
document.getElementById("Clear").addEventListener("click", (e) => {
    Clear();
});

//start.addEventListener('dragstart', dragStart);
start.addEventListener('dragend', dragEnd);

for(const cell of cells){
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("dragenter", dragenter);
    cell.addEventListener("dragleave", dragleave);
    cell.addEventListener("drop", dragDrop);
}



  
  function dragEnd() {
    this.className = 'start';
  }
  
  function dragOver(e) {
    e.preventDefault();
  }
  
  function dragenter(e) {
    e.preventDefault();
  }
  
  function dragleave() {
    this.className = 'col';
  }
  
  function dragDrop() {
    this.className = "col";
    this.append(start);
    start_point = new Cell(Array.from(this.parentNode.children).indexOf(this), Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode));
  }

 
  function select(x,y){
    const red = document.createElement("div");
    red.classList.add("red");
    elements.item(y).children.item(x).append(red);
}



var ce = new Cell(4,4);

function paint(a)
{ 
  var x = 0;
  var y = 0;
  var counter = 0;
  var id = setInterval(se, 500);
  function se()
  {
    if(counter > 3){
      clearInterval(id);
    }
    x = ce.neighbors()[counter].x;
    y = ce.neighbors()[counter].y;
    counter++;
    select(x,y);
  }
}



paint();