/**
 * Created by Asnim P Ansari on 8/21/2016.
 */

window.onload = function ()
{

    var canvas = document.getElementById("snakecanvas");
    var ctx = canvas.getContext("2d");
    var snake = [{x: 40 + 500, y: 100}, {x: 60 + 500, y: 100}, {x: 80 + 500, y: 100}, {x: 100 + 500, y: 100}];
    var var_level_0 = [];
    var direction = 1;
    var rndX = 0, rndY = 0;
    var fence = new Array(8);
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
        if (keyCode === 39 && direction != SnakeDirections.LEFT) {
            direction = SnakeDirections.RIGHT;
        }
        if (keyCode === 40 && direction != SnakeDirections.UP) {
            direction = SnakeDirections.DOWN;
        }
        if (keyCode === 37 && direction != SnakeDirections.RIGHT) {
            direction = SnakeDirections.LEFT;
        }
        if (keyCode === 38 && direction != SnakeDirections.DOWN) {
            direction = SnakeDirections.UP;
        }
    });
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
        // fencemaker();

        var snake_head = {x: snake[snake.length - 1].x, y: snake[snake.length - 1].y};
        if (snake_head.x === rndX && snake_head.y === rndY) {
            console.log("Passed Food");
            // snakeshift();
            score = score + 1;
            // foodMaker();
        }

    }

    setInterval(animate, 10);
    function snakeshift(){
        last_pos = snake[snake.length - 1];
        switch(direction){
            case 1:
                // direction = SnakeDirections.RIGHT;
                snake.push({x:last_pos.x + 20,y:last_pos.y});

                break;
            case 2:
                // direction = SnakeDirections.DOWN;
                console.log("DOWN");
                snake.push({x:last_pos.x,y:last_pos.y + 20});

                break;
            case 3:
                // direction = SnakeDirections.LEFT;
                snake.push({x:last_pos.x - 20,y:last_pos.y});

                break;
            case 4:
                // direction = SnakeDirections.UP;
                snake.push({x:last_pos.x,y:last_pos.y - 20});
                break;
        }
        // foodMaker();
    }
}