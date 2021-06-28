require("./css/index.css");


import "regenerator-runtime/runtime";


import {pathfinding, Clear, UCS, cost_so_far} from "./SearchPath.js";
const {PriorityQueue} = require("./DataStructure.js");
const {Cell} = require("./DataStructure.js"); 
var elements=document.getElementById('matrix').children;
const start = document.getElementById("start");
const end = document.getElementById("end");
const cells = document.querySelectorAll(".col");
var start_point = new Cell(0,0);
var end_point = new Cell(2,2);
var selected_id = "start";

function path_mark(x,y)
{
  const blue = document.createElement("div");
  blue.classList.add("blue");
  elements.item(y).children.item(x).append(blue);
}

document.getElementById("Visualizer").addEventListener("click", async (e) => {
    //console.log(pathfinding(start_point, end_point));
    
    let promise = new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve(UCS(start_point, end_point));
      }, 1000)
    })
    
    var UCS_dict = await promise;
    let promise2 = new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve(pathfinding(start_point, end_point, UCS_dict))
      }, 2000)
    })
    const path = await promise2;
    path.forEach((p) => path_mark(p.x, p.y))

    
    //pathfinding(start_point, end_point, UCS_dict).forEach((pos) => path_mark(pos.charAt(0), pos.charAt(1)));
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
    cell.addEventListener("click", block_setter);
}


 function block_setter()
 {

   this.classList.add("block");
   var block_point = new Cell(Array.from(this.parentNode.children).indexOf(this), Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode));
   cost_so_far[block_point.id] = null
   console.log(block_point.id);
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
      console.log(end_point);
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
