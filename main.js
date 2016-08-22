/**
 * Created by Asnim P Ansari on 8/21/2016.
 */
window.onload = function () {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d"),
        score = 0,
        level  = 0;
    canvas.width = 204;
    canvas.height = 200;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);
    var map = new Array(20);
    for(var i = 0;i< map.length;i++){
        console.log("GENERATED MAP");
        map[i] = new Array(20);
    }
    map = generateFood(map);
    drawGame();
    function drawGame() {
        console.log("INSIDE DRAWGAME");

        ctx.clearRect(0,0,canvas.width,canvas.height);
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



}