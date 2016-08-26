/**
 * Created by Asnim P Ansari on 8/27/2016.
 */


window.onload = function () {
    var canvas = document.getElementById("snakecanvas");
    var ctx = canvas.getContext("2d");
    var SNAKE = 1,BLANK = 2, FENCE = 3,FOOD = 4;
    var ROW = 20;
    var COLM = 40;

    var matrix = new Array(ROW);
    for(var i =0 ;i<matrix.length;i++){
        matrix[i] = new Array(COLM);
    }
    matrix_initialisation();
    function matrix_initialisation() {
        console.log(matrix);
        for(var i = 0;i<ROW;i++){
            for (j = 0;i<COLM;j++){
                matrix[i][j] = 0;
            }
        }

    }
}