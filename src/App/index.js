require("./css/index.css");
import {pathfinding, Clear} from "./SearchPath.js";

const {Cell} = require("./DataStructure.js"); 
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

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  async function loop()
  {
      await timeout(3000);
      console.log("b");
  }
  loop();
