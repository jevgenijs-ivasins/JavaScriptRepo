let maze =   [[1,0,1,1,1,1,1,1,1,1],
              [1,0,1,0,0,1,0,0,0,1],
              [1,0,1,0,1,1,0,1,0,1],
              [1,0,0,0,1,1,0,1,0,1],
              [1,0,1,0,1,1,0,1,0,1],
              [1,0,1,0,1,1,0,1,0,1],
              [1,0,1,0,1,1,0,1,0,1],
              [1,0,1,0,1,0,0,1,0,1],
              [1,0,0,0,0,0,1,1,0,0],
              [1,1,1,1,1,1,1,1,1,1],]

var elementArray = [];

let playerPos = [0,1]
let playerPrevPos = [];
let endPoint = [8,9]


const MOVE_LEFT = 0;
const MOVE_UP = 1;
const MOVE_RIGHT = 2;
const MOVE_DOWN = 3;

const Y = 0;
const X = 1;

const WALL = 1;
const PATH = 0;

document.addEventListener('keydown',function(e){
    switch(e.code){
        case "ArrowLeft":
            movePlayer(MOVE_LEFT);
            break;
        case "ArrowUp":
            movePlayer(MOVE_UP);
            break;
        case "ArrowRight":
            movePlayer(MOVE_RIGHT);
            break;
        case "ArrowDown":
            movePlayer(MOVE_DOWN);
            break;
    }
});

function displayPlayer(currentPlayerPos){
    elementArray[currentPlayerPos[Y]][currentPlayerPos[X]].style.backgroundColor = "green";
}

function displayMaze(maze){
    for(let y = 0; y < maze.length; y++){
        let xArray = [];
        for(let x = 0; x < maze[y].length; x++){
            let mazeElement = document.createElement("canvas");
            document.body.appendChild(mazeElement);
            mazeElement.width = "50";
            mazeElement.height = "50";
            if(maze[y][x] === 1){
                mazeElement.style.border = "thin solid black";
            }else{
                mazeElement.style.border = "thin solid white";
            }

            xArray.push(mazeElement);
        }
        let breakpoint = document.createElement('br');
        elementArray.push(xArray);
        document.body.appendChild(breakpoint);
    }
}

function movePlayer(direction){
    switch(direction){
        case MOVE_LEFT:
            if(isWayPossible(MOVE_LEFT)){
                elementArray[playerPos[Y]][playerPos[X]].style.backgroundColor = "white";
                playerPos[X] = playerPos[X] - 1;
                elementArray[playerPos[Y]][playerPos[X]].style.backgroundColor = "green";
            }else{
                alert("Can't go through wall or exit the maze!");
            }
            break;
        case MOVE_UP:
            if(isWayPossible(MOVE_UP)){
                elementArray[playerPos[Y]][playerPos[X]].style.backgroundColor = "white";
                playerPos[Y] = playerPos[Y] - 1;
                elementArray[playerPos[Y]][playerPos[X]].style.backgroundColor = "green";
            }else{
                alert("Can't go through wall or exit the maze!");
            }
            break;
        case MOVE_RIGHT:
            if(isWayPossible(MOVE_RIGHT)){
                elementArray[playerPos[Y]][playerPos[X]].style.backgroundColor = "white";
                playerPos[X] = playerPos[X] + 1;
                elementArray[playerPos[Y]][playerPos[X]].style.backgroundColor = "green";
            }else{
                alert("Can't go through wall or exit the maze!");
            }
            break;
        case MOVE_DOWN:
            if(isWayPossible(MOVE_DOWN)){
                elementArray[playerPos[Y]][playerPos[X]].style.backgroundColor = "white";
                playerPos[Y] = playerPos[Y] + 1;
                elementArray[playerPos[Y]][playerPos[X]].style.backgroundColor = "green";
            }else{
                alert("Can't go through wall or exit the maze!");
            }
            break;
    }
    checkWinCondition();
}

function checkWinCondition(){
    if(playerPos[Y] === 8 && playerPos[X] === 9){
        alert("You won!");
    }
}

function displayEndPoint(endPoint){
    elementArray[endPoint[Y]][endPoint[X]].style.backgroundColor = "red";
}


// IDK WHY DOESN'T IT WORK
function isWayPossible(direction){
    switch(direction){
        case MOVE_LEFT:
            if(maze[playerPos[Y]][(playerPos[X] - 1)] === WALL){
                return false;
            }
        case MOVE_UP:
            if(maze[(playerPos[Y] - 1)][playerPos[X]] === WALL ){
                return false;
            }
        case MOVE_RIGHT:
            if(maze[playerPos[Y]][(playerPos[X] + 1)] === WALL ){
                return false;
            }
        case MOVE_DOWN:
            if(maze[(playerPos[Y] + 1)][playerPos[X]] === WALL ){
                return false;
            }        
    }
    return true;
}



displayMaze(maze);
displayPlayer(playerPos);
displayEndPoint(endPoint);
