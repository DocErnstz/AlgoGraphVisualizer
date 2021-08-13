require("./css/index.css");
import "regenerator-runtime/runtime";

import { Clear, ClearBlocks, cost_so_far } from "./SearchPath.js";

const { Cell, PriorityQueue } = require("./DataStructure.js");

var start_point = new Cell(0, 0);
var end_point = new Cell(1, 0);
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

function UCS(start, goal) {
  var frontier = new PriorityQueue();
  frontier.enqueue(start, 0);
  var came_from = {};
  came_from[start.id] = null;
  cost_so_far[start.id] = 0;
  let id = null;
  var neigh_ids = [];
  neigh_ids.push(goal.id);
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
};
