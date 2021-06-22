const {PriorityQueue} = require("./DataStructure.js");
const {Cell} = require("./DataStructure.js");
var elements=document.getElementById('matrix').children;

function select(x,y){
    const red = document.createElement("div");
    red.classList.add("red");
    elements.item(y).children.item(x).append(red);
}

export function Clear()
{
    for(var x = 0; x < 17; x++)
    {
        for(var y = 0; y < 17; y++)
        {
            //elements.item(y).children.item(x).removeChild(elements.item(x).children.item(y).firstChild);   
            console.log(elements.item(y).children.item(x).firstChild.getElementById("red"));
            while (elements.item(y).children.item(x).lastElementChild) {
                elements.item(y).children.item(x).removeChild(elements.item(y).children.item(x).lastElementChild);
              }
        }
    }
}

function UCS(start, goal){
    var frontier = new PriorityQueue();
    frontier.enqueue(start, 0);
    var cost_so_far = {};
    var came_from = {};
    came_from[start.id] = null;
    cost_so_far[start.id] = 0;

    while (!frontier.isEmpty()){
        var current = frontier.front();
        frontier.dequeue();
        if(current.element.id == goal.id){
            break;
        }
       
        
        current.element.neighbors().forEach(next => {
            var new_cost = 1 + cost_so_far[current.element.id]
            if (!(next.id in cost_so_far) || (new_cost < cost_so_far[next.id]))
            {
                cost_so_far[next.id] = new_cost;
                frontier.enqueue(next, new_cost);
                came_from[next.id] = current.element;
                select(next.x,next.y);
            }
        });
       
    }
    return came_from;   
}


export function pathfinding(start, goal)
{
    var current = goal.id;
    var path = []
    var dict = UCS(start, goal);
    while(current != start.id)
    {
        path.push(current);
        current = dict[current].id;
    }
    return path
}
