/**
 * Created by Asnim P Ansari on 8/21/2016.
 */
window.onload = function() {
  // INITIALISING CANVAS AND OTHER COMPONENTS REQUIRED
  var canvas = document.getElementById('snakecanvas');
  var canvas1 = document.getElementById('snakescoreboard');
  var ctx1 = canvas1.getContext('2d');
  var ctx = canvas.getContext('2d');

  // INITIALISED SNAKE
  var snake = [{ x: 40, y: 200 }, { x: 60, y: 200 }, { x: 80, y: 200 }];
  var direction = 1;
  var rndX = 0,
    rndY = 0;
  var REFRESH_DELAY = 150;
  var GAME_LEVEL = 0;

  var fence = new Array(8);

  //AUDIO INITIALISATION FOR THE GAME
  var aud_btnPress = new Audio('audio/btn_press.mp3');
  var aud_foodCaptured = new Audio('audio/food_captured.mp3');
  var aud_wallHit = new Audio('audio/wall_hit.mp3');
  var aud_selfBite = new Audio('audio/self_bite.mp3');

  //AUTOMATIC FENCE GENERATION FOR EACH LEVEL
  for (i = 0; i < fence.length; i++) {
    fence[i] = new Array();
  }
  fence[0] = [];
  // BLANK FENCE 1
  for (var i = 0; i < 48; i++) {
    fence[1].push({ x: i * 20, y: 0 }, { x: i * 20, y: 620 });
  }
  for (var i = 1; i < 31; i++) {
    fence[1].push({ y: i * 20, x: 0 }, { y: i * 20, x: 940 });
  }
  //LEVEL 2 FENCE
  for (var i = 0; i < 7; i++) {
    fence[2].push(
      { x: i * 20, y: 0 },
      { x: 940 - i * 20, y: 0 },
      { x: i * 20, y: 620 },
      { x: 940 - i * 20, y: 620 },
      { x: 0, y: i * 20 },
      { x: 0, y: 620 - i * 20 },
      { x: 940, y: i * 20 },
      { x: 940, y: 620 - i * 20 }
    );
  }
  shift_X = 220;
  shift_Y = 200;
  for (var i = 0; i < 25; i++) {
    fence[2].push(
      { x: i * 20 + shift_X, y: shift_Y },
      { x: i * 20 + shift_X, y: 620 - shift_Y }
    );
  }
  // LEVEL 3  FENCE
  var level_3_shiftX = 300;
  var level_3_shiftY = 100;
  for (var i = 0; i < 20; i++) {
    fence[3].push(
      { x: level_3_shiftX, y: 620 - i * 20 },
      { x: 940 - level_3_shiftX, y: i * 20 }
    );
  }
  for (var i = 0; i < 20; i++) {
    fence[3].push(
      { x: i * 20, y: level_3_shiftY },
      { x: 940 - i * 20, y: 620 - level_3_shiftY }
    );
  }
  //LEVEL 4 FENCE
  for (i = 0; i < 48; i++) {
    fence[4].push({ x: i * 20, y: 0 }, { x: i * 20, y: 620 });
  }
  for (i = 0; i < 10; i++) {
    fence[4].push(
      { x: 0, y: i * 20 },
      { x: 940, y: i * 20 },
      { x: 0, y: 620 - i * 20 },
      { x: 940, y: 620 - i * 20 },
    );
  }
  shift_X = 300;
  shift_Y = 100;
  Y_Offet = 120;
  for (var i = 0; i < 20; i++) {
    fence[4].push(
      { x: +shift_X, y: shift_Y + Y_Offet + i * 20 },
      { x: 940 - shift_X, y: shift_Y + i * 20 }
    );
  }
  // LEVEL 5 FENCE HORIZONTALS
  for (var i = 0; i < 10; i++) {
    fence[5].push({ x: i * 20, y: 0 });
  }
  for (var i = 16; i < 35; i++) {
    fence[5].push({ x: i * 20, y: 0 });
  }
  for (var i = 0; i < 26; i++) {
    fence[5].push({ x: i * 20, y: 260 });
  }
  for (var i = 34; i < 48; i++) {
    fence[5].push({ x: i * 20, y: 260 });
  }
  for (var i = 0; i < 48; i++) {
    fence[5].push({ x: i * 20, y: 460 });
  }
  //VERTICALS
  for (var i = 1; i <= 8; i++) {
    fence[5].push({ x: 0, y: i * 20 });
  }
  for (var i = 1; i <= 12; i++) {
    fence[5].push({ x: 500, y: i * 20 });
  }
  for (var i = 1; i <= 12; i++) {
    fence[5].push({ x: 700, y: 460 + i * 20 });
  }
  //LEVEL 6 FENCE
  for (var i = 0; i < 48; i++) {
    fence[6].push({ x: i * 20, y: 320 });
  }
  for (var i = 0; i < 48; i++) {
    fence[6].push({ x: 460, y: i * 20 });
  }
  //LEVEL 7 FENCE
  for (var i = 0; i < 48; i++) {
    fence[7].push({ x: i * 20, y: 420 });
  }
  for (var i = 0; i < 11; i++) {
    fence[7].push({ x: 240, y: 420 + i * 20 }, { x: 740, y: 420 + i * 20 });
  }
  // END OF FENCE GENERATION SECTION

  //CO-ORIDATES FOR SHOWING SNAKE game_over
  var game_over = new Array();

  //GENRERATE 5 PIX HORIZONTALS
  for (var i = 0; i < 5; i++) {
    game_over.push(
      { x: 200 + i * 20, y: 20 },
      { x: 200 + i * 20, y: 140 },
      { x: 40 + i * 20, y: 360 },
      { x: 40 + i * 20, y: 600 },
      { x: 40 + i * 20, y: 20 },
      { x: 40 + i * 20, y: 260 },
      { x: 40 + i * 20, y: 140 },
      { x: 140, y: 160 + i * 20 }
    );
  }

  //GENRERATE 12 PIX HORIZONTALS
  for (var i = 0; i < 12; i++) {
    game_over.push({ x: 180, y: i * 20 + 40 }, { x: 300, y: i * 20 + 40 });
  }

  //GENRERATE 11 PIX HORIZONTALS
  for (var i = 0; i < 11; i++) {
    game_over.push({ x: 20, y: i * 20 + 40 });
  }

  //13 pixel vertials
  for (var i = 0; i < 13; i++) {
    game_over.push(
      { x: 340, y: i * 20 + 20 },
      { x: 500, y: i * 20 + 20 },
      { x: 340 + i * 6, y: i * 20 + 20 },
      { x: 500 - i * 6, y: i * 20 + 20 },
      { x: 540, y: 20 + i * 20 },
      { x: 20, y: 360 + i * 20 },
      { x: 140, y: 360 + i * 20 },
      { x: 180 + i * 6, y: 360 + i * 20 },
      { x: 340 - i * 6, y: 360 + i * 20 },
      { x: 380, y: 360 + i * 20 },
      { x: 520, y: 360 + i * 20 }
    );
  }
  //GERERATE 6 PIXESLS
  for (var i = 0; i < 6; i++) {
    game_over.push(
      { x: 560 + i * 20, y: 20 },
      { x: 560 + i * 20, y: 140 },
      { x: 560 + i * 20, y: 260 },
      { x: 380 + i * 20, y: 360 },
      { x: 380 + i * 20, y: 480 },
      { x: 380 + i * 20, y: 600 },
      { x: 520 + i * 20, y: 360 },
      { x: 520 + i * 20, y: 460 },
      { x: 620, y: 360 + i * 20 },
      { x: 520 + i * 20, y: 480 + i * 20 },
      { x: 620, y: 600 }
    );
  }

  //SHIFT POSTION OF GAME OVER
  for (var i = 0; i < game_over.length; i++) {
    game_over[i].x += 120;
  }

  // SNAKEDIRECTION DICTIONARY CREATIION
  var SnakeDirections = { UP: 4, DOWN: 2, LEFT: 3, RIGHT: 1 };
  // SCORE  AND DISPLAY LEVEL INITIALISATION
  score = 0;
  level = 1;
  // KEYPRESS AND EXECUTION FLAG( USED TO PREVENT MUTLIPLE STROKES WHICH LEADS TO SNAKE BIT )
  var key_executed = true;

  // ARROW KEY LISTNER FOR SNAKE CONTROLS
  document.addEventListener('keydown', function(e) {
    var keyCode = e.keyCode;
    keyList = { 39: false, 40: false, 37: false, 38: false };
    keyList[keyCode] = true;
    // PRECAUTION TO PREVENT HITTING MUTLIPLE KEY( IMPLIMENTED A BOOLEAN FUNCTION WITH VARIABLES WHICH SHOWS TRUE WHEN ONLY ONE VARIABLE IS TRUE)
    // USED HERE TO DETECT WHETHER TWO KEYS HAS BEEN STRUCK TOGETHER
    if (
      (!keyList[39] && !keyList[40] && !keyList[37] && keyList[38]) ||
      (!keyList[39] && !keyList[40] && keyList[37] && !keyList[38]) ||
      (!keyList[39] && keyList[40] && !keyList[37] && !keyList[38]) ||
      (keyList[39] && !keyList[40] && !keyList[37] && !keyList[38])
    ) {
      if (keyCode === 39 && direction != SnakeDirections.LEFT && key_executed) {
        key_executed = false;
        direction = SnakeDirections.RIGHT;
        aud_btnPress.play();
      } else if (
        keyCode === 40 &&
        direction != SnakeDirections.UP &&
        key_executed
      ) {
        key_executed = false;
        direction = SnakeDirections.DOWN;
        aud_btnPress.play();
      } else if (
        keyCode === 37 &&
        direction != SnakeDirections.RIGHT &&
        key_executed
      ) {
        key_executed = false;
        direction = SnakeDirections.LEFT;
        aud_btnPress.play();
      } else if (
        keyCode === 38 &&
        direction != SnakeDirections.DOWN &&
        key_executed
      ) {
        key_executed = false;
        direction = SnakeDirections.UP;
        aud_btnPress.play();
      }
    }
  });
  foodMaker();

  // ANIMATE FUNCTION IS USED TO REFRESH THE CANVAS
  function animate() {
    ctx.clearRect(0, 0, 959, 639);
    ctx.fillStyle = '#384619';

    // LOOP FOR DRAWING SNAKE
    for (var i = 0; i < snake.length; i++) {
      ctx.fillRect(snake[i].x, snake[i].y, 19, 19);

      // IF ELSE SECTION TO DETECT WHETHER THE SNAKE HEAD HAS PASSED ORIGIN
      // AND SET APPROPIRATE  CO ORDIATES
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
    snakeFoodDraw();
    snake.shift(); // USED TO MOVE SNAKE
    ctx1.background = '#000000';
    ctx1.font = '20px sans-serif';
    ctx1.clearRect(0, 0, 959, 100);
    ctx1.fillText('SCORE BOARD :' + score, 15, 40);
    ctx1.fillText('LEVEL :' + level, 15, 80);
    snakeshift();
    key_executed = true;
    var snake_head = {
      x: snake[snake.length - 1].x,
      y: snake[snake.length - 1].y,
    };
    if (snake_head.x === rndX && snake_head.y === rndY) {
      console.log('Passed Food');
      aud_foodCaptured.play();
      snakeshift();
      score = score + 1;
      foodMaker();
      if (score % 10 == 0) {
        snake = [{ x: 40, y: 180 }, { x: 60, y: 180 }, { x: 80, y: 180 }];
        direction = SnakeDirections.RIGHT;
        GAME_LEVEL = GAME_LEVEL + 1;
        foodMaker();
        if (GAME_LEVEL === 8) {
          GAME_LEVEL = 0;
          REFRESH_DELAY = REFRESH_DELAY - 20;
          clearInterval(interval_id);
          interval_id = setInterval(animate, REFRESH_DELAY);
          level = level + 1;
        }
      }
    }
    for (var i = 0; i < snake.length - 2; i++) {
      if (snake_head.x === snake[i].x && snake_head.y === snake[i].y) {
        wallHit();
      }
    }
    for (var i = 0; i < fence[GAME_LEVEL].length; i++) {
      if (
        snake_head.x === fence[GAME_LEVEL][i].x &&
        snake_head.y === fence[GAME_LEVEL][i].y
      ) {
        selfBite();
      }
    }
    for (var i = 0; i < fence[GAME_LEVEL].length; i++) {
      ctx.fillRect(fence[GAME_LEVEL][i].x, fence[GAME_LEVEL][i].y, 19, 19);
    }
  }
  // showgame_overScreen();
  interval_id = setInterval(animate, REFRESH_DELAY);
  // interval_id = requestAnimationFrame(animate);
  function snakeshift() {
    last_pos = snake[snake.length - 1];
    last_pos = snake[snake.length - 1];
    switch (direction) {
      case 1:
        snake.push({ x: last_pos.x + 20, y: last_pos.y });
        break;
      case 2:
        snake.push({ x: last_pos.x, y: last_pos.y + 20 });
        break;
      case 3:
        snake.push({ x: last_pos.x - 20, y: last_pos.y });
        break;
      case 4:
        snake.push({ x: last_pos.x, y: last_pos.y - 20 });
        break;
    }
  }
  function foodMaker() {
    (rndX = Math.round(Math.random() * 38) * 20),
      (rndY = Math.round(Math.random() * 38) * 20);
    console.log(rndX, rndY);
    while (rndX > 920 || rndY > 600) {
      rndX = Math.round(Math.random() * 38) * 20;
      rndY = Math.round(Math.random() * 38) * 20;
    }

    try {
      var total_length = fence[GAME_LEVEL].length || 0;
    } catch (err) {
      var total_length = 0;
    }
    for (i = 0; i < total_length; i++) {
      if (fence[GAME_LEVEL][i].x === rndX && fence[GAME_LEVEL][i].y === rndY) {
        rndX = Math.round(Math.random() * 38) * 20;
        rndY = Math.round(Math.random() * 38) * 20;
        i = 0;
        console.log('IN FENSE');
      }
      console.log('LOOPING');
    }
  }
  function snakeFoodDraw() {
    // Changed Shape of Food
    ctx.fillRect(rndX + 6, rndY, 6, 6);
    ctx.fillRect(rndX + 6, rndY + 12, 6, 6);
    ctx.fillRect(rndX, rndY + 6, 6, 6);
    ctx.fillRect(rndX + 12, rndY + 6, 6, 6);
  }
  function wallHit() {
    console.log('HIT');
    aud_wallHit.play();
    setTimeout(showgame_overScreen, 2000);
    // showgame_overScreen();
    clearInterval(interval_id);
  }

  function selfBite() {
    aud_selfBite.play();
    console.log('HIT');
    setTimeout(showgame_overScreen, 2000);
    clearInterval(interval_id);
  }
  function showgame_overScreen() {
    ctx.clearRect(0, 0, 959, 639);
    ctx.fillStyle = '#384619';
    for (i = 0; i < game_over.length; i++) {
      ctx.fillRect(game_over[i].x, game_over[i].y, 19, 19);
    }
  }
};
