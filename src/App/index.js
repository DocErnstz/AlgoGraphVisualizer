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
function path_mark(x,y)
{
  const blue = document.createElement("div");
  blue.classList.add("blue");
  elements.item(y).children.item(x).append(blue);
}

document.getElementById("Visualizer").addEventListener("click", async (e) => {
    //console.log(pathfinding(start_point, end_point));
    let promise = new Promise(function(resolve, reject) {
      setTimeout(()=>{
        resolve(UCS(start_point, end_point));
      },1000)
    });
    var UCS_dict = await promise;
    let promise2 = new Promise(function(resolve, reject) {
      setTimeout(()=>{
        resolve(pathfinding(start_point, end_point, UCS_dict));
      },2000)
    });
    var path = await promise2;
    console.log(path);
    path.forEach((pos) => (
      path_mark(pos.charAt(0), pos.charAt(1))
    ));
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
