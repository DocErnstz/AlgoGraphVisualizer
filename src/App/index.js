require("./styles.css");
import pathfinding from "./SearchPath.js";
const {Cell} = require("./DataStructure.js"); 
console.log(pathfinding(new Cell(0,0), new Cell(2,2)));


