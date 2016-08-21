/**
 * Created by Asnim P Ansari on 8/21/2016.
 */
window.onload = function () {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext("2d");
    canvas.width = 204;
    canvas.height = 200;
    var score = 0;
    var level = 0;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);
    function drawInitial() {
        canvas.lineWidth = 2;//2 Pixel Bordeer Width
        canvas.strokeStyle = "black";//Black Color
        ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);

        ctx.font = "12px sans-serif";
        ctx.fillText('SCORE:' + score + 'LEVEL:' + level,2,12)


    }
    drawInitial();
    var map = new Array(20);
    for(var i = 0;i<map.length;i++){
        map[i] = new Array(20);
    }
    function foodMaker() {
        var rndX = Math.round(Math.random() * 19),
            rndY = Math.round(Math.random() * 19);
        while(map[rndX][rndY] === 2){
            rndX = Math.round(Math.random() * 19);
            rndY = Math.round(Math.random() * 19);
        }
        map[rndX][rndY] = 1;
        return map;

    }



}