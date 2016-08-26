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
        matrix[5][10] = SNAKE;
        matrix[6][10] = SNAKE;
        matrix[7][10] =  SNAKE;
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
    setInterval(drawGame,100);
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
    }
}