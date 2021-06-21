require("./styles.css");

var elements=document.getElementById('matrix').children;

function select(x,y){
    elements.item(x).children.item(y).classList.add("red");
}




class Cell {
    constructor(x, y) {
      this.x = y;
      this.y = y;
    }
    neighbors(){
        var set = [];
        var minX = -1;
        var minY = -1;
        var maxX =  2;
        var maxY =  2;
        if (this.x-1 < 0)
          minX = 0;
        if (this.x+1 > 15)
          maxX = 1;
        if (this.y-1 < 0)
          minY = 0;
        if (this.y+1 > 15)
          maxY = 1;
        for (var x = minX; x < maxX; x++) {
          for (var y = minY; y < maxY; y++) {
            if((x == 0 && y == 0) || (x == 1 && y == 1) || (x == -1 && y == -1) || (x == -1 && y == 1) || (x == 1 && y == -1))
            continue;
            
            set.push(new Cell(x + this.x,y + this.y));
            
            
          }
        }
      return set
    }
  }

