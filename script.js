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

let crawlerStartPos = [0,1]

let endPoint = [8,9]

let mazePaths = []

const MOVE_LEFT = 0;
const MOVE_UP = 1;
const MOVE_RIGHT = 2;
const MOVE_DOWN = 3;

const Y = 0;
const X = 1;

const WALL = 1;
const PATH = 0;

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

function moveObj(direction, objPosition){
    switch(direction){
        case MOVE_LEFT:
            if(isWayPossible(MOVE_LEFT,objPosition)){
                elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "white";
                objPosition = calcNewPos(MOVE_LEFT,objPosition);
                elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "green";
                return objPosition;
            }
            break;
        case MOVE_UP:
            if(isWayPossible(MOVE_UP,objPosition)){
                elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "white";
                objPosition = calcNewPos(MOVE_UP,objPosition);
                elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "green";
                return objPosition;
            }
            break;
        case MOVE_RIGHT:
            if(isWayPossible(MOVE_RIGHT,objPosition)){
                elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "white";
                objPosition = calcNewPos(MOVE_RIGHT,objPosition);
                elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "green";
                return objPosition;
            }
            break;
        case MOVE_DOWN:
            if(isWayPossible(MOVE_DOWN,objPosition)){
                elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "white";
                objPosition = calcNewPos(MOVE_DOWN,objPosition);
                elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "green";
                return objPosition;
            }
            break;
    }
    checkWinCondition();
}

function calcNewPos(direction, objPosition){
    newPos = structuredClone(objPosition)
    switch(direction){
        case MOVE_LEFT:
            newPos[X] = objPosition[X] - 1;
            return newPos;
        case MOVE_UP:
            newPos[Y] = objPosition[Y] - 1;
            return newPos;
        case MOVE_RIGHT:
            newPos[X] = objPosition[X] + 1;
            return newPos;
        case MOVE_DOWN:
            newPos[Y] = objPosition[Y] + 1;
            return newPos;
    }
}

function displayPathPoint(position){
    elementArray[position[Y]][position[X]].style.backgroundColor = "violet";
}

function isWayPossible(direction, objPosition){
    switch(direction){
        case MOVE_LEFT:
            if((objPosition[X] - 1 < 0) || maze[objPosition[Y]][(objPosition[X] - 1)] === WALL){
                return false;
            }
            break;
        case MOVE_UP:
            if((objPosition[Y] - 1 < 0) || maze[(objPosition[Y] - 1)][objPosition[X]] === WALL){
                return false;
            }
            break;
        case MOVE_RIGHT:
            if((objPosition[X] + 1 > 9) || maze[objPosition[Y]][(objPosition[X] + 1)] === WALL){
                return false;
            }
            break;
        case MOVE_DOWN:
            if((objPosition[Y] + 1 > 9) || maze[(objPosition[Y] + 1)][objPosition[X]] === WALL){
                return false;
            }  
            break;      
    }
    return true;
}


function pathDetectDirections(crawlerPos, path){
    let directionList = [];
    if(isWayPossible(MOVE_DOWN,crawlerPos) && !arrayIncludes(path,calcNewPos(MOVE_DOWN,crawlerPos))){
        directionList.push(MOVE_DOWN);
    }
    if(isWayPossible(MOVE_LEFT,crawlerPos) && !arrayIncludes(path,calcNewPos(MOVE_LEFT,crawlerPos))){
        directionList.push(MOVE_LEFT);
    }
    if(isWayPossible(MOVE_RIGHT,crawlerPos) && !arrayIncludes(path,calcNewPos(MOVE_RIGHT,crawlerPos))){
        directionList.push(MOVE_RIGHT);
    }
    if(isWayPossible(MOVE_UP,crawlerPos) && !arrayIncludes(path,calcNewPos(MOVE_UP,crawlerPos))){
        directionList.push(MOVE_UP);
    }
    if(equalsCheck(crawlerPos,endPoint)){
        mazePaths.push(path);
        return;
    }
    if(directionList.length === 0){
        return;
    }
    if(directionList.length > 1){
        directionList.forEach((direction) => {
            newpath = structuredClone(path);
            newpos = structuredClone(crawlerPos);
            mazeCrawlerMove(newpos,direction,newpath);
        });
    }else{
        mazeCrawlerMove(crawlerPos,directionList[0],path);
    }
}
function arrayIncludes(array, search){
    for(index = 0; index < array.length; index++){
        if(array[index][Y] == search[Y] && array[index][X] == search[X]){
            return true;
        }
    }
    return false;
}


function mazeCrawlerMove(crawlerPos, direction, path){
    newPos = calcNewPos(direction,crawlerPos);
    elementArray[newPos[Y]][newPos[X]].style.backgroundColor = "yellow";
    path.push(newPos);
    pathDetectDirections(newPos,path);
}

const equalsCheck = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}

function visualizeShortetPath(mazePaths){
    let minLength = mazePaths[0].length;
    let shortestPath = mazePaths[0];
    for(index = 1; index < mazePaths.length; index++){
        if(mazePaths[index].length < minLength){
            shortestPath = mazePaths[index];
        }
    }
    for(pathIndex = 0; pathIndex < shortestPath.length; pathIndex++){
        elementArray[shortestPath[pathIndex][Y]][shortestPath[pathIndex][X]].style.backgroundColor = "pink";
    }

}

displayMaze(maze);

let path = [crawlerStartPos];
pathDetectDirections(crawlerStartPos,path);
visualizeShortetPath(mazePaths);



/*  ###################################################
    PLAYER CONTROLS SECTION AND MANUAL MAZE NAVIGATION
    ###################################################
document.addEventListener('keydown',function(e){
    switch(e.code){
        case "ArrowLeft":
            moveObj(MOVE_LEFT,playerPos);
            break;
        case "ArrowUp":
            moveObj(MOVE_UP,playerPos);
            break;
        case "ArrowRight":
            moveObj(MOVE_RIGHT,playerPos);
            break;
        case "ArrowDown":
            moveObj(MOVE_DOWN,playerPos);
            break;
    }
});
*/
/*
function displayPlayer(currentPlayerPos){
    elementArray[currentPlayerPos[Y]][currentPlayerPos[X]].style.backgroundColor = "green";
}
function checkWinCondition(){
    if(playerPos[Y] === 8 && playerPos[X] === 9){
        alert("You won!");
    }
}

function displayEndPoint(endPoint){
    elementArray[endPoint[Y]][endPoint[X]].style.backgroundColor = "red";
}
*/

