require("./styles.css");

var elements=document.getElementById('matrix').children;

function select(x,y){
    elements.item(x).children.item(y).classList.add("red");
}




