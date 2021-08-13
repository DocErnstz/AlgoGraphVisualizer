const { Cell, PriorityQueue } = require("./DataStructure.js");

var size_x = 71;
var size_y = 32;
export var cost_so_far = {};

export function select(x, y) {
  var elements = document.getElementById("matrix").children;
  const red = document.createElement("div");
  red.classList.add("red");

  try {
    elements.item(y).children.item(x).append(red);
  } catch (error) {
    console.log(elements.item(y).children.length);
  }
}

export function Clear() {
  var elements = document.getElementById("matrix").children;
  cost_so_far = {};

  for (var x = 0; x < size_x; x++) {
    for (var y = 0; y < size_y; y++) {
      if (elements.item(y).children.item(x).lastElementChild != null) {
        if (
          elements
            .item(y)
            .children.item(x)
            .lastElementChild.classList.contains("red")
        ) {
          elements.item(y).children.item(x).innerHTML = "";
        }
      }
    }
  }
}

export function ClearBlocks() {
  var elements = document.getElementById("matrix").children;
  cost_so_far = {};
  for (var x = 0; x < size_x; x++) {
    for (var y = 0; y < size_y; y++) {
      if (
        elements.item(y).children.item(x).className == "col block"
          ? true
          : false
      ) {
        elements.item(y).children.item(x).className = "col";
      }
    }
  }
}
