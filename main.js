/**
 * Created by Asnim P Ansari on 8/21/2016.
 */
window.onload = function () {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext("2d");
    canvas.width = 204;
    canvas.height = 200;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);

    canvas.lineWidth = 2;//2 Pixel Bordeer Width
    canvas.strokeStyle = "black";//Black Color
    ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);

}