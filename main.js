/**
 * Created by Asnim P Ansari on 8/21/2016.
 */
window.onload = function ()
{
    var canvas = document.getElementById("snakecanvas");
    var canvas1 = document.getElementById("snakescoreboard");
    var ctx1 = canvas1.getContext("2d");
    var ctx = canvas.getContext("2d");
    var snake = [{x: 40, y: 200}, {x: 60, y: 200}, {x: 80, y: 200}, {x: 100, y: 200}];
    var var_level_0 = [];
    var direction = 1;
    var rndX = 0, rndY = 0;
    var GAME_LEVEL = 0;
    var fence = new Array(8);
    for(i = 0;i<fence.length;i++){
        fence[i] = new Array();
    }
    fence[0] = [];
    // BLANK FENCE 1
    for(var i = 0;i< 48;i++){
        fence[1].push({x:i*20,y:0},{x:i*20,y:620});
    }
    for(var i = 1;i< 31;i++){
        fence[1].push({y:i*20,x:0},{y:i*20,x:940});
    }
    //LEVEL 2 FENCE
    for(var i = 0;i<7;i++){
        fence[2].push({x:i*20,y:0},{x:940 - i*20,y:0},
            {x:i*20,y:620},{x:940 - i*20,y:620},
            {x:0,y:i*20},{x:0,y:620 - i*20},
            {x:940,y:i*20},{x:940,y:620 - i *20}
        )
    }
    shift_X = 220;
    shift_Y = 200;
    for(var i = 0;i<25;i++) {
        fence[2].push({x: i * 20 + shift_X, y: shift_Y},
            {x: i * 20 + shift_X, y: 620 - shift_Y});
    }
    // LEVEL 3  FENCE
    var level_3_shiftX = 300;
    var level_3_shiftY = 100;
    for(var i = 0;i<20;i++){
        fence[3].push({x:level_3_shiftX,y:620-i*20},{x:940-level_3_shiftX,y:i*20});
    }
    for(var i = 0;i<20;i++){
        fence[3].push({x:i*20,y:level_3_shiftY},{x:940-i*20,y:620-level_3_shiftY});
    }
    //LEVEL 4 FENCE
    for(i = 0;i<48;i++){
        fence[4].push({x:i*20,y:0},{x:i*20,y:620})
    }
    for(i = 0;i<48;i++){
        fence[4].push({x:i*20,y:0},{x:i*20,y:620})
    }
    for(i = 0;i<10;i++){
        fence[4].push({x:0,y:i*20},{x:940,y:i*20},
            {x:0,y:620-i*20},{x:940,y:620-i*20}
        )
    }
    shift_X = 300;
    shift_Y = 100;
    for(var i = 0;i<20;i++){
        fence[4].push({x:+ shift_X,y:shift_Y + i*20},
            {x:940 - shift_X,y:shift_Y +i*20});
    }
    // LEVEL 5 FENCE HORIZONTALS
    for(var i =0;i<10;i++){
        fence[5].push({x:i*20,y:0});
    }
    for(var i =16;i<35;i++){
        fence[5].push({x:i*20,y:0});
    }
    for(var i =0;i<26;i++){
        fence[5].push({x:i*20,y:260});
    }
    for(var i =34;i<48;i++){
        fence[5].push({x:i*20,y:260});
    }
    for(var i =0;i<48;i++){
        fence[5].push({x:i*20,y:460});
    }
    //VERTICALS
    for(var i =1;i<=8;i++){
        fence[5].push({x:0,y:i*20});
    }
    for(var i =1;i<=12;i++){
        fence[5].push({x:500,y:i*20});
    }
    for(var i =1;i<=12;i++){
        fence[5].push({x:700,y:460+i*20});
    }
    //LEVEL 6 FENCE
    for(var i=0;i<48;i++){
        fence[6].push({x:i*20,y:320})
    }
    for(var i=0;i<48;i++){
        fence[6].push({x:460,y:i*20})
    }
    //LEVEL 7 FENCE
    for(var i=0;i<48;i++){
        fence[7].push({x:i*20,y:420})
    }
    for(var i = 0;i<11;i++){
        fence[7].push({x:240,y:420+i*20},{x:740,y:420+i*20})
    }
    var SnakeDirections = {       UP: 4,        DOWN: 2,        LEFT: 3,        RIGHT: 1    };
    score = 0;
    document.addEventListener("keydown", function (e) {
        var keyCode = e.keyCode;
        console.log(keyCode);
        if ((keyCode === 39 || keyCode === 68) && direction != SnakeDirections.LEFT) {
            direction = SnakeDirections.RIGHT;
        }
        if ((keyCode === 40 || keyCode === 83) && direction != SnakeDirections.UP) {
            direction = SnakeDirections.DOWN;
        }
        if ((keyCode === 37 || keyCode === 65)&& direction != SnakeDirections.RIGHT) {
            direction = SnakeDirections.LEFT;
        }
        if ((keyCode === 38 || keyCode === 87) && direction != SnakeDirections.DOWN) {
            direction = SnakeDirections.UP;
        }
    });
    foodMaker();
    function animate() {
        ctx.clearRect(0, 0, 959, 639);
        ctx.fillStyle = "#384619";
        for (var i = 0; i < snake.length; i++) {
            ctx.fillRect(snake[i].x, snake[i].y, 19, 19);
            if (snake[i].x > 940) {
                snake[i].x = 0;
            }
            if (snake[i].y > 620) {
                snake[i].y = 0;
            }
            if (snake[i].x < 0) {
                snake[i].x = 960;
            }
            if (snake[i].y < 0) {
                snake[i].y = 640;
            }
        }
        ctx.fillRect(rndX, rndY, 19, 19);
        snake.shift();
        ctx1.background = "#000000";
        ctx1.font = "20px sans-serif";
        ctx1.clearRect(0,0,959,100);
        ctx1.fillText("SCORE BOARD :" + score, canvas1.width/2, 20);
        ctx1.fillText("SCORE :" + score, 60, 100);
        snakeshift();
        var snake_head = {x: snake[snake.length - 1].x, y: snake[snake.length - 1].y};
        if (snake_head.x === rndX && snake_head.y === rndY) {
            console.log("Passed Food");
            snakeshift();
            score = score + 1;
            foodMaker();
            if(score%2 == 0){
                GAME_LEVEL = GAME_LEVEL + 1;
            }
        }
        for(var i = 0;i<snake.length - 2;i++){
            if (snake_head.x === snake[i].x && snake_head.y === snake[i].y){
                console.log("HIT");
                clearInterval(interval_id);
            }
        }
        for(var i = 0;i< fence[GAME_LEVEL].length;i++){
            if (snake_head.x === fence[GAME_LEVEL][i].x && snake_head.y === fence[GAME_LEVEL][i].y){
                console.log("HIT");
                clearInterval(interval_id);
            }
        }
        for (var i =0;i<fence[GAME_LEVEL].length;i++){
            ctx.fillRect(fence[GAME_LEVEL][i].x,fence[GAME_LEVEL][i].y,19,19);
        }
    }
    interval_id = setInterval(animate, 50);
    function snakeshift(){
        last_pos = snake[snake.length - 1];
        switch(direction){
            case 1:
                snake.push({x:last_pos.x + 20,y:last_pos.y});
                break;
            case 2:
                snake.push({x:last_pos.x,y:last_pos.y + 20});
                break;
            case 3:
                snake.push({x:last_pos.x - 20,y:last_pos.y});
                break;
            case 4:
                snake.push({x:last_pos.x,y:last_pos.y - 20});
                break;
        }
    }
    function foodMaker(){
        rndX = Math.round(Math.random() * 38)*20,
            rndY = Math.round(Math.random() * 38)*20;
        console.log(rndX,rndY);
        while(rndX > 940 || rndY > 620){
            rndX = Math.round(Math.random() * 38)*20;
            rndY = Math.round(Math.random() * 38)*20;
        }
    }
}