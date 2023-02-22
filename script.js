let MazeProgram = (function ()
{


    let maze = 
   [[1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],]

    let elementArray = [];

    let playerPos = [0, 1]

    let crawlerStartPos = [0, 1]

    let endPoint = [8, 9]

    let mazePaths = []

    const MOVE_LEFT = 0;
    const MOVE_UP = 1;
    const MOVE_RIGHT = 2;
    const MOVE_DOWN = 3;

    const Y = 0;
    const X = 1;

    const WALL = 1;
    const PATH = 0;

    // For first element to be starting point of crawler
    let path = [crawlerStartPos];

    function displayMaze(maze) {
        for (let y = 0; y < maze.length; y++) {
            let xArray = [];
            for (let x = 0; x < maze[y].length; x++) {
                let mazeElement = document.createElement("canvas");
                document.body.appendChild(mazeElement);
                mazeElement.width = "50";
                mazeElement.height = "50";
                if (maze[y][x] === 1) {
                    mazeElement.style.border = "thin solid black";
                } else {
                    mazeElement.style.border = "thin solid white";
                }
                xArray.push(mazeElement);
            }
            let breakpoint = document.createElement('br');
            elementArray.push(xArray);
            document.body.appendChild(breakpoint);
        }
    }

    // Function to move object from one place to another by specifying direction. If movement is impossible, nothing will happen.    
    function moveObj(direction, objPosition) {
        switch (direction) {
            case MOVE_LEFT:
                if (isWayPossible(MOVE_LEFT, objPosition)) {
                    elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "white";
                    objPosition = calcNewPos(MOVE_LEFT, objPosition);
                    elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "green";
                    return objPosition;
                }
                break;
            case MOVE_UP:
                if (isWayPossible(MOVE_UP, objPosition)) {
                    elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "white";
                    objPosition = calcNewPos(MOVE_UP, objPosition);
                    elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "green";
                    return objPosition;
                }
                break;
            case MOVE_RIGHT:
                if (isWayPossible(MOVE_RIGHT, objPosition)) {
                    elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "white";
                    objPosition = calcNewPos(MOVE_RIGHT, objPosition);
                    elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "green";
                    return objPosition;
                }
                break;
            case MOVE_DOWN:
                if (isWayPossible(MOVE_DOWN, objPosition)) {
                    elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "white";
                    objPosition = calcNewPos(MOVE_DOWN, objPosition);
                    elementArray[objPosition[Y]][objPosition[X]].style.backgroundColor = "green";
                    return objPosition;
                }
                break;
        }
        checkWinCondition();
    }

    // Function to calculate new position coorditanes based on direction and initial position
    function calcNewPos(direction, objPosition) {
        newPos = structuredClone(objPosition)
        switch (direction) {
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

    // Function to check if certain movement is possible or not
    function isWayPossible(direction, objPosition) {
        switch (direction) {
            case MOVE_LEFT:
                if ((objPosition[X] - 1 < 0) || maze[objPosition[Y]][(objPosition[X] - 1)] === WALL) {
                    return false;
                }
                break;
            case MOVE_UP:
                if ((objPosition[Y] - 1 < 0) || maze[(objPosition[Y] - 1)][objPosition[X]] === WALL) {
                    return false;
                }
                break;
            case MOVE_RIGHT:
                if ((objPosition[X] + 1 > 9) || maze[objPosition[Y]][(objPosition[X] + 1)] === WALL) {
                    return false;
                }
                break;
            case MOVE_DOWN:
                if ((objPosition[Y] + 1 > 9) || maze[(objPosition[Y] + 1)][objPosition[X]] === WALL) {
                    return false;
                }
                break;
        }
        return true;
    }
    // Compare values in array by values of another one array
    function arrayIncludes(array, search) {
        for (index = 0; index < array.length; index++) {
            if (array[index][Y] == search[Y] && array[index][X] == search[X]) {
                return true;
            }
        }
        return false;
    }
    // Compare two arrays by values
    const equalsCheck = (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    /*  ###################################################
        PLAYER CONTROLS SECTION AND MANUAL MAZE NAVIGATION
        ################################################### */

    document.addEventListener('keydown', function (e) {
        let playerPrevPos = playerPos;
        switch (e.code) {
            case "ArrowLeft":
                playerPos = moveObj(MOVE_LEFT, playerPos);

                break;
            case "ArrowUp":
                playerPos = moveObj(MOVE_UP, playerPos);
                break;
            case "ArrowRight":
                playerPos = moveObj(MOVE_RIGHT, playerPos);
                break;
            case "ArrowDown":
                playerPos = moveObj(MOVE_DOWN, playerPos);
                break;
        }
        if (playerPos === undefined) {
            playerPos = playerPrevPos
        }
    });

    // Display player at start ( in this implementation ovveriden by shortest path )  
    function displayPlayer(currentPlayerPos) {
        elementArray[currentPlayerPos[Y]][currentPlayerPos[X]].style.backgroundColor = "green";
    }

    // Function to check win condition for player and his location
    function checkWinCondition() {
        if (equalsCheck(playerPos, endPoint)) {
            alert("You won!");
        }
    }

    // Function to display end point at start ( in this implementation ovveriden by shortest path )
    function displayEndPoint(endPoint) {
        elementArray[endPoint[Y]][endPoint[X]].style.backgroundColor = "red";
    }


    /*  ###################################################
                   SHORTEST PATH GENERATION SECTION
        ################################################### */

    // Function to detect all possible paths from the current point
    function pathDetectDirections(crawlerPos, path) {
        let directionList = [];
        if (isWayPossible(MOVE_DOWN, crawlerPos) && !arrayIncludes(path, calcNewPos(MOVE_DOWN, crawlerPos))) {
            directionList.push(MOVE_DOWN);
        }
        if (isWayPossible(MOVE_LEFT, crawlerPos) && !arrayIncludes(path, calcNewPos(MOVE_LEFT, crawlerPos))) {
            directionList.push(MOVE_LEFT);
        }
        if (isWayPossible(MOVE_RIGHT, crawlerPos) && !arrayIncludes(path, calcNewPos(MOVE_RIGHT, crawlerPos))) {
            directionList.push(MOVE_RIGHT);
        }
        if (isWayPossible(MOVE_UP, crawlerPos) && !arrayIncludes(path, calcNewPos(MOVE_UP, crawlerPos))) {
            directionList.push(MOVE_UP);
        }
        if (equalsCheck(crawlerPos, endPoint)) {
            mazePaths.push(path);
            return;
        }
        if (directionList.length === 0) {
            return;
        }
        if (directionList.length > 1) {
            directionList.forEach((direction) => {
                newpath = structuredClone(path);
                newpos = structuredClone(crawlerPos);
                mazeCrawlerMove(newpos, direction, newpath);
            });
        } else {
            mazeCrawlerMove(crawlerPos, directionList[0], path);
        }
    }

    // Navigation for crawler through specific direction, saving the path
    function mazeCrawlerMove(crawlerPos, direction, path) {
        newPos = calcNewPos(direction, crawlerPos);
        elementArray[newPos[Y]][newPos[X]].style.backgroundColor = "yellow";
        path.push(newPos);
        pathDetectDirections(newPos, path);
    }

    // Shortest path visualization
    function visualizeShortestPath(mazePaths) {
        let minLength = mazePaths[0].length;
        let shortestPath = mazePaths[0];
        for (index = 1; index < mazePaths.length; index++) {
            if (mazePaths[index].length < minLength) {
                shortestPath = mazePaths[index];
            }
        }
        for (pathIndex = 0; pathIndex < shortestPath.length; pathIndex++) {
            elementArray[shortestPath[pathIndex][Y]][shortestPath[pathIndex][X]].style.backgroundColor = "pink";
        }

    }

    function startMazeScript(){
        displayMaze(maze);
        displayPlayer(playerPos);
        displayEndPoint(endPoint);
    
        pathDetectDirections(crawlerStartPos, path);
        visualizeShortestPath(mazePaths);
    }
    return{
        start: startMazeScript
    };
})();

MazeProgram.start();
