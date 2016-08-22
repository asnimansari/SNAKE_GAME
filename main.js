/**
 * Created by Asnim P Ansari on 8/21/2016.
 */
window.onload = function () {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d"),
        score = 0,
        level  = 0,
        direction = 0,
        snake = new Array(3);

    canvas.width = 204;
    canvas.height = 200;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);
    var map = new Array(20);
    for(var i = 0;i< map.length;i++){
        console.log("GENERATED MAP");
        map[i] = new Array(20);
    }
    map = generateSnake(map);
    map = generateFood(map);
    drawGame();
    function drawGame() {
        console.log("INSIDE DRAWGAME");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var x = 0; x < map.length; x++) {
            for (var y = 0; y < map[0].length; y++) {
                console.log("INSIDE MAIN LOOP");

                if (map[x][y] === 1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
                }
                else if (map[x][y] === 2) {
                    ctx.fillStyle = 'orange';
                    ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
                }
            }

        }


        drawMain();
    }

    function drawMain() {
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.strokeRect(2,20,canvas.width - 4,canvas.height - 4);
        ctx.font = "12px sans-serif";
        ctx.fillText('Score: ' + score + ' - Level '+level,2,12);


    }
    function generateFood(map) {
        console.log("INSIDE GENERTE FOOD");

        var rndX = Math.round(Math.random() * 19),
            rndY = Math.round(Math.random() * 19);
        while (map[rndX][rndY] === 2){
            rndX = Math.round(Math.random() * 19);
            rndY = Math.round(Math.random() * 19);
        }
        map[rndX][rndY] = 1;
        return map;
    }
    function generateSnake(map) {

        console.log("INSIDE GENERATE SNAKE");
        rndX = Math.round(Math.random() * 19);
        rndY = Math.round(Math.random() * 19);
        while((rndX - snake.length)<0){
            rndX = Math.round(Math.random() * 19);
        }
        for (var i = 0;i<snake.length;i++){
            snake[i] = {x:rndX - i,y:rndY};
            map[rndX -i][rndY] = 2;
        }
        return map;
    }



}