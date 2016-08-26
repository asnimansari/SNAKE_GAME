/**
 * Created by Asnim P Ansari on 8/27/2016.
 */


window.onload = function () {
    var canvas = document.getElementById("snakecanvas");
    var ctx = canvas.getContext("2d");
    var SNAKE = 2,BLANK = 1, FENCE = 3,FOOD = 4;
    var ROW = 40;
    var COLM = 80;
    var SNAKE_HEAD;
    var FOOD_POS = {x:0,y:0};
    var SnakeDIR = {RIGHT:1,DOWN:2,LEFT:3,UP:4};
    var DIRECTION = SnakeDIR.RIGHT;
    var matrix = new Array(COLM);
    for(var i =0 ;i<COLM;i++){
        matrix[i] = new Array(ROW);
    }


    document.addEventListener("keydown", function (e) {
        var keyCode = e.keyCode;

            if ((keyCode === 39) && DIRECTION != SnakeDIR.LEFT) {
                DIRECTION = SnakeDIR.RIGHT;
            }
            else if ((keyCode === 40) && DIRECTION != SnakeDIR.UP) {
                DIRECTION = SnakeDIR.DOWN;
            }
            else if ((keyCode === 37)&& DIRECTION != SnakeDIR.RIGHT) {
                DIRECTION = SnakeDIR.LEFT;
            }
            else if ((keyCode === 38) && DIRECTION != SnakeDIR.DOWN) {
                DIRECTION = SnakeDIR.UP;
            }

    });
    matrix_initialisation();
    snake_initialization();
    generate_food();
    function matrix_initialisation() {
        for(var i = 0;i<COLM;i++){
            console.log(matrix[i].length);
            for(var j = 0;j<ROW;j++){
                matrix[i][j] = 1;
            }
        }
    }
    
    function snake_initialization () {
        snake = new Array({x:5,y:10},{x:6,y:10},{x:7,y:10});
    }
    function generate_food() {
        FOOD_POS.x = Math.round(Math.random()*100);
        FOOD_POS.y = Math.round(Math.random()*100);
        if(FOOD_POS.x >= ROW || FOOD_POS.y>=COLM){
            FOOD_POS.x = Math.round(Math.random()*100);
            FOOD_POS.y = Math.round(Math.random()*100);
        }
        console.log("FOOD CO ORDINATES",FOOD_POS.x,FOOD_POS.y);
    }
    setInterval(drawGame,400);
    drawGame();
    function drawGame() {
        console.log("DRAWING GAME");
        ctx.fillStyle = "#000000";
        ctx.clearRect(0,0,ROW*20,COLM*20);
        for (var i = 0;i<COLM;i++){
            for(var j = 0;j<ROW;j++){
                // ctx.fillRect(i*10,j*10,9,9);
                if(matrix[i][j] === SNAKE){
                    ctx.fillRect(i*10,j*10,9,9);
                }
            }
        }

        for(var i = 0;i<snake.length;i++){
            if(snake[i].x >=COLM){
                snake[i].x = 0;
            }
            if(snake[i].y >=ROW){
                snake[i].y = 0;
            }
            if(snake[i].x <0){
                snake[i].x = COLM - 1;
            }
            if(snake[i].y <0){
                snake[i].y = ROW - 1;
            }
            ctx.fillRect(snake[i].x*10,snake[i].y*10,9,9);
        }
        snake.shift();
        switch (DIRECTION){
            case SnakeDIR.RIGHT:
                snake.push({x:snake[snake.length - 1].x+1,y:snake[snake.length -1].y});
                break;
            case SnakeDIR.LEFT:
                snake.push({x:snake[snake.length - 1].x-1,y:snake[snake.length -1].y});
                break;
            case SnakeDIR.UP:
                snake.push({x:snake[snake.length - 1].x,y:snake[snake.length -1].y - 1});
                break;
            case SnakeDIR.DOWN:
                snake.push({x:snake[snake.length - 1].x,y:snake[snake.length -1].y + 1});
                break;

        }
        console.log(snake);
    }
}