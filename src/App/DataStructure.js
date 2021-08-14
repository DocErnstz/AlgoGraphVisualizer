var size_x = 71;
var size_y = 31;
class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  isEmpty() {
    return this.items.length == 0;
  }

  enqueue(element, priority) {
    var qElement = new QElement(element, priority);
    var contain = false;

    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(qElement);
    }
  }

  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.id = x.toString() + " " + y.toString();
  }
  neighbors() {
    var set = [];
    var minX = -1;
    var minY = -1;
    var maxX = 2;
    var maxY = 2;
    if (this.x - 1 < 0) minX = 0;
    if (this.x + 1 > size_x - 1) maxX = 1;
    if (this.y - 1 < 0) minY = 0;
    if (this.y + 1 > size_y - 1) maxY = 1;
    for (var x = minX; x < maxX; x++) {
      for (var y = minY; y < maxY; y++) {
        if (
          (x == 0 && y == 0) ||
          (x == 1 && y == 1) ||
          (x == -1 && y == -1) ||
          (x == -1 && y == 1) ||
          (x == 1 && y == -1)
        )
          continue;
        set.push(new Cell(x + this.x, y + this.y));
      }
    }
    return set;
  }
  skipNeigh() {
    var set = [];
    var minX = -2;
    var minY = -2;
    var maxX = 2;
    var maxY = 2;
    if (this.x - 1 < 0) minX = 0;
    if (this.x + 1 > size_x - 1) maxX = 0;
    if (this.y - 1 < 0) minY = 0;
    if (this.y + 1 > size_y - 1) maxY = 0;
    for (var x = minX; x < maxX + 2; x += 2) {
      for (var y = minY; y < maxY + 2; y += 2) {
        if (
          (x == 0 && y == 0) ||
          (x == 2 && y == 2) ||
          (x == -2 && y == -2) ||
          (x == -2 && y == 2) ||
          (x == 2 && y == -2)
        )
          continue;
        set.push(new Cell(x + this.x, y + this.y));
      }
    }
    return set;
  }
}

module.exports = { QElement, PriorityQueue, Cell };
