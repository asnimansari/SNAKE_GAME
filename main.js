/**
 * Created by Asnim P Ansari on 8/21/2016.
 */
window.onload = function ()
{
    var canvas = document.getElementById("snakecanvas");
    var ctx = canvas.getContext("2d");
    var snake = [{x: 40, y: 100}, {x: 60, y: 100}, {x: 80, y: 100}, {x: 100, y: 100}];
    var var_level_0 = [];
    var direction = 1;
    var rndX = 0, rndY = 0;
    // var fence = new Array(8);
    var fence = [];
    for(var i = 0;i< 48;i++){
        fence.push({x:i*20,y:0},{x:i*20,y:620});
    }


    for(var i = 1;i< 31;i++){
        fence.push({y:i*20,x:0},{y:i*20,x:940});
    }


    var SnakeDirections = {
        UP: 4,
        DOWN: 2,
        LEFT: 3,
        RIGHT: 1
    }
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
        ctx.font = "20px sans-serif";
        ctx.fillText("SCORE :" + score, 10, 90);
        snakeshift();

        var snake_head = {x: snake[snake.length - 1].x, y: snake[snake.length - 1].y};
        if (snake_head.x === rndX && snake_head.y === rndY) {
            console.log("Passed Food");
            snakeshift();
            score = score + 1;
            foodMaker();
        }


        for(var i = 0;i<snake.length - 2;i++){
            if (snake_head.x === snake[i].x && snake_head.y === snake[i].y){
                console.log("HIT");
                clearInterval(interval_id);
            }
        }
        for(var i = 0;i< fence.length;i++){
            if (snake_head.x === fence[i].x && snake_head.y === fence[i].y){
                console.log("HIT");
                clearInterval(interval_id);
            }
        }





        for (var i =0;i<fence.length;i++){
            ctx.fillRect(fence[i].x,fence[i].y,19,19);
        }
    }
    interval_id = setInterval(animate, 10);
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