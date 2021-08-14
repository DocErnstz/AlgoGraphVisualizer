require("./css/index.css");
import "regenerator-runtime/runtime";

import { Clear, ClearBlocks, cost_so_far } from "./SearchPath.js";

const { Cell, PriorityQueue } = require("./DataStructure.js");

var start_point = new Cell(0, 0);
var end_point = new Cell(2, 0);
const start = document.getElementById("start");
const end = document.getElementById("end");
const cells = document.querySelectorAll(".col");

var selected_id = "start";

export var blocks = {};
export function path_mark(x, y) {
  var elements = document.getElementById("matrix").children;
  const blue = document.createElement("div");
  blue.classList.add("blue");
  elements.item(y).children.item(x).append(blue);
}

document.getElementById("Visualizer").addEventListener("click", async () => {
  listenVisual();
});

document.getElementById("GenMaze").addEventListener("click", () => {
  setWalls();
  MazeEater();
});


function MazeEater() {
  var stack = []
  var elements = document.getElementById("matrix").children;
  var start = new Cell(0,0);
  stack.push(start.id);
  let current = start;
  var i = 0;
  let id = null;
  id = setInterval(function(){
    if(i > 100){
      clearInterval(id);
    }
   
    if(current.skipNeigh().filter(x => !stack.includes(x.id)).length == 0){

      stack.pop()
    
      let ce =  new Cell(parseInt(stack[stack.length - 1].split(" ")[0]), parseInt(stack[stack.length - 1].split(" ")[1]))
      let a = 0;
      
      while(ce.skipNeigh().filter(x => !stack.includes(x.id)).length == 0){
        a = a + 1;
        console.log(a);
        stack.pop();
        ce = new Cell(parseInt(stack[stack.length - 1].split(" ")[0]), parseInt(stack[stack.length - 1].split(" ")[1]))
      }
      current = ce;
      
    }
    
    var filterNeigh = current.skipNeigh().filter(x => !stack.includes(x.id));
    
    var ran = Math.floor(Math.random() * filterNeigh.length);
    try{
       var next = filterNeigh[ran];
    }
    catch(error){
      console.log(filterNeigh);
    }
    eatWall(current, next);
    try{
      stack.push(next.id);
    } catch(error) {
     console.log(filterNeigh);
    }
    
    current = next;
    i++;
  }, 5);


}





function eatWall(a, b) {
  function remover(vari, varj) {
    try{
      elements.item(varj).children.item(vari).classList.remove("block");
    } catch(error) {
      var set = [];
      set.push(vari);
      set.push(varj);
      
    }
    
    var block_point = new Cell(
      Array.from(
        elements.item(varj).children.item(vari).parentNode.children
      ).indexOf(elements.item(varj).children.item(vari)),
      Array.from(
        elements.item(varj).children.item(vari).parentNode.parentNode.children
      ).indexOf(elements.item(varj).children.item(vari).parentNode)
    );
    delete blocks[block_point.id];
    delete cost_so_far[block_point.id];
  }
  var elements = document.getElementById("matrix").children;
  try{
    var difx = b.x - a.x;
  var dify = b.y - a.y;
  } catch(error) {
    
  }
  
  if (difx != 0) {
    var x = a.x + difx / 2;
    var y = a.y;
    remover(x, y);
  }
  if (dify != 0) {
    var x = a.x;
    var y = dify / 2 + a.y;
    remover(x, y);
  }
}

function setWalls() {
  function setter(vari, varj) {
    elements.item(varj).children.item(vari).classList.add("block");
    var block_point = new Cell(
      Array.from(
        elements.item(varj).children.item(vari).parentNode.children
      ).indexOf(elements.item(varj).children.item(vari)),
      Array.from(
        elements.item(varj).children.item(vari).parentNode.parentNode.children
      ).indexOf(elements.item(varj).children.item(vari).parentNode)
    );
    blocks[block_point.id] = null;
    cost_so_far[block_point.id] = null;
  }
  var elements = document.getElementById("matrix").children;
  for (var j = 1; j < elements.length; j += 2) {
    for (var i = 0; i < elements.item(0).children.length; i += 1) {
      setter(i, j);
    }
  }
  for (var j = 0; j < elements.length; j += 1) {
    for (var i = 1; i < elements.item(0).children.length; i += 2) {
      setter(i, j);
    }
  }
}




function UCS(start, goal) {
  var frontier = new PriorityQueue();
  frontier.enqueue(start, 0);
  var came_from = {};
  came_from[start.id] = null;
  cost_so_far[start.id] = 0;
  let id = null;
  var neigh_ids = [];
  neigh_ids.push(goal.id);
  console.log(goal.neighbors());
  goal.neighbors().forEach((element) => {
    neigh_ids.push(element.id);
  });

  id = setInterval(function () {
    var current = frontier.front();

    frontier.dequeue();
    if (current.element.id == goal.id) {
      clearInterval(id);
      Clear();
      var i = 0;
      let idz = null;
      var pathf = pathfinding(start_point, end_point, came_from);
      idz = setInterval(() => {
        if (i == pathf.length) {
          clearInterval(idz);
        }

        path_mark(pathf[i].x, pathf[i].y);

        i += 1;
      }, 10);
    }
    current.element.neighbors().forEach((next) => {
      var new_cost = 1 + cost_so_far[current.element.id];
      if (!(next.id in cost_so_far) || new_cost < cost_so_far[next.id]) {
        cost_so_far[next.id] = new_cost;
        frontier.enqueue(next, new_cost);
        came_from[next.id] = current.element;

        if (!neigh_ids.includes(next.id)) {
          select(next.x, next.y);
        }
      }
    });
  }, 1);

  return came_from;
}

function pathfinding(start, goal, dict) {
  var path = [];
  var current = dict[goal.id];
  while (current.id != start.id) {
    path.push(current);
    current = dict[current.id];
  }
  return path;
}

async function listenVisual() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(UCS(start_point, end_point));
    }, 1000);
  });

  var UCS_dict = await promise;
}

document.getElementById("Clear").addEventListener("click", (e) => {
  ClearBlocks();
});

start.addEventListener("dragstart", dragStart);
end.addEventListener("dragstart", dragStart);

function setlisteners() {
  for (const cell of cells) {
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("dragenter", dragenter);
    cell.addEventListener("dragleave", dragleave);
    cell.addEventListener("drop", dragDrop);
    cell.addEventListener("click", block_setter);
  }
}
setlisteners();

function block_setter() {
  if (!this.hasChildNodes()) {
    this.classList.add("block");
    var block_point = new Cell(
      Array.from(this.parentNode.children).indexOf(this),
      Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode)
    );
    blocks[block_point.id] = null;
    cost_so_far[block_point.id] = null;
  }
}

async function dragStart() {
  let promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("production has started");
    }, 200);
  });
  let promise2 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("production has finished");
    }, 300);
  });
  await promise2.then(() => (selected_id = this.id));
}

function dragOver(e) {
  e.preventDefault();
}

function dragenter(e) {
  e.preventDefault();
}

function dragleave() {
  this.className = "col";
}

async function dragDrop() {
  let promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve();
    }, 200);
  });
  let promise2 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve();
    }, 300);
  });
  if (selected_id == "end") {
    await promise2.then(() => this.append(end));
    end_point = new Cell(
      Array.from(this.parentNode.children).indexOf(this),
      Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode)
    );
  } else {
    await promise2.then(() => this.append(start));
    start_point = new Cell(
      Array.from(this.parentNode.children).indexOf(this),
      Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode)
    );
  }
}

function select(x, y) {
  var elements = document.getElementById("matrix").children;
  const red = document.createElement("div");
  red.classList.add("red");
  elements.item(y).children.item(x).append(red);
}

module.exports = {
  setlisteners: setlisteners,
  select: select,
  path_mark: path_mark,
  dragStart: dragStart,
  setWalls: setWalls,
  eatWall: eatWall,
};
