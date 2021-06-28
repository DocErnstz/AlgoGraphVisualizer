require("./css/index.css");


import "regenerator-runtime/runtime";


import {pathfinding, Clear, UCS} from "./SearchPath.js";
const {PriorityQueue} = require("./DataStructure.js");


const {Cell} = require("./DataStructure.js"); 
var elements=document.getElementById('matrix').children;
const start = document.getElementById("start");
const end = document.getElementById("end");
const cells = document.querySelectorAll(".col");
var start_point = new Cell(0,0);
var end_point = new Cell(2,2);
var selected_id = "start";

document.getElementById("Visualizer").addEventListener("click", (e) => {
    UCS(start_point, end_point);
});
document.getElementById("Clear").addEventListener("click", (e) => {
    Clear();
});

start.addEventListener('dragstart', dragStart);
end.addEventListener('dragstart', dragStart);


for(const cell of cells){
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("dragenter", dragenter);
    cell.addEventListener("dragleave", dragleave);
    cell.addEventListener("drop", dragDrop);
}



  
  async function dragStart() {
    let promise = new Promise(function(resolve, reject) {
      setTimeout(()=>{
        resolve("production has started")
      },200)
    });
    let promise2 = new Promise(function(resolve, reject) {
      setTimeout(()=>{
        resolve("production has finished")
      },300)
    });
    await promise2.then((b) => selected_id = this.id);
  
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
  
  async function dragDrop() {
    let promise = new Promise(function(resolve, reject) {
      setTimeout(()=>{
        resolve()
      },200)
    });
    let promise2 = new Promise(function(resolve, reject) {
      setTimeout(()=>{
        resolve()
      },300)
    });
    if(selected_id == "end")
    {
      await promise2.then(() => this.append(end))
      end_point = new Cell(Array.from(this.parentNode.children).indexOf(this), Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode));
    }
    else
    {
      await promise2.then(() => this.append(start))
      start_point = new Cell(Array.from(this.parentNode.children).indexOf(this), Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode));

    }
    

    //start_point = new Cell(Array.from(this.parentNode.children).indexOf(this), Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode));
  }

 
  function select(x,y){
    const red = document.createElement("div");
    red.classList.add("red");
    elements.item(y).children.item(x).append(red);
}
