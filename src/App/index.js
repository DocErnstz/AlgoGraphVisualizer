require("./css/index.css");
import "regenerator-runtime/runtime";

import {
  pathfinding,
  Clear,
  ClearBlocks,
  UCS,
  cost_so_far,
} from "./SearchPath.js";
const { PriorityQueue } = require("./DataStructure.js");
const { Cell } = require("./DataStructure.js");

const start = document.getElementById("start");
const end = document.getElementById("end");
const cells = document.querySelectorAll(".col");
var start_point = new Cell(0, 0);
var end_point = new Cell(2, 2);
var selected_id = "start";
export var blocks = {};
function path_mark(x, y) {
  var elements = document.getElementById("matrix").children;
  const blue = document.createElement("div");
  blue.classList.add("blue");
  elements.item(y).children.item(x).append(blue);
}

document.getElementById("Visualizer").addEventListener("click", async () => {
  listenVisual();
});

async function listenVisual() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(UCS(start_point, end_point));
    }, 1000);
  });

  var UCS_dict = await promise;
  let promise2 = new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(pathfinding(start_point, end_point, UCS_dict));
    }, 1500);
  });
  let promise3 = new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(Clear());
    }, 2000);
  });
  const path = await promise2;
  path.forEach((p) => path_mark(p.x, p.y));
  const clear = await promise3;
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
  this.classList.add("block");
  var block_point = new Cell(
    Array.from(this.parentNode.children).indexOf(this),
    Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode)
  );
  blocks[block_point.id] = null;
  cost_so_far[block_point.id] = null;
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
    console.log(end_point);
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
  selected_id: selected_id,
  dragStart: dragStart,
};
