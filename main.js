/**
 * Created by Asnim P Ansari on 8/21/2016.
 */


var canvas  = document.getElementById("snakecanvas");
var ctx = canvas.getContext("2d");
var snake = [{x:40+500,y:100},{x:60+500,y:100},{x:80+500,y:100},{x:100+500,y:100}];
var var_level_0 =[];
var direction = 1;
var rndX = 0,rndY = 0;
var SnakeDirections = {
    UP : 4,
    DOWN : 2,
    LEFT : 3,
    RIGHT : 1
}
score = 0;
document.addEventListener("keydown",function(e){
    var keyCode = e.keyCode;
    console.log(keyCode);
    if(keyCode === 39 && direction != SnakeDirections.LEFT){
        direction = SnakeDirections.RIGHT;
    }
    if(keyCode === 40 && direction != SnakeDirections.UP){
        direction = SnakeDirections.DOWN;
    }
    if(keyCode === 37 && direction != SnakeDirections.RIGHT){
        direction = SnakeDirections.LEFT;
    }
    if(keyCode === 38 && direction != SnakeDirections.DOWN){
        direction = SnakeDirections.UP;
    }
});