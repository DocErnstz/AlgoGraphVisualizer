const { Cell } = require("./DataStructure.js");
export function block_setter(element) {
  element.classList.add("block");
  var block_point = new Cell(
    Array.from(element.parentNode.children).indexOf(element),
    Array.from(element.parentNode.parentNode.children).indexOf(
      element.parentNode
    )
  );
  return block_point;
}
