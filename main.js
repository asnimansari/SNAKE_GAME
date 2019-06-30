/**
 * Created by Asnim P Ansari on 8/21/2016.
 */

let REFRESH_DELAY = 150;
const SNAKE_POSITION_OFFSET = 20;
window.onload = function() {
  let i;
  // INITIALISING CANVAS AND OTHER COMPONENTS REQUIRED
  const snakecanvas = document.getElementById('snakecanvas');
  const scoreboardCanvas = document.getElementById('snakescoreboard');
  const snakeGameContext = scoreboardCanvas.getContext('2d');
  const scoreBoardContext = snakecanvas.getContext('2d');
  const SnakeDirections = { UP: 4, DOWN: 2, LEFT: 3, RIGHT: 1 };

  const audioButtonPress = new Audio('audio/btn_press.mp3');
  const audioFoodCaptured = new Audio('audio/food_captured.mp3');
  const audioWallHit = new Audio('audio/wall_hit.mp3');
  const audioSelfBite = new Audio('audio/self_bite.mp3');

  // INITIALISED SNAKE
  let snake = [{ x: 40, y: 200 }, { x: 60, y: 200 }, { x: 80, y: 200 }];

  //Sets Initial Snake Moving Direction
  let direction = SnakeDirections.RIGHT;

  let foodLocationX = 0;
  let foodLocationY = 0;

  let gameLevel = 0;

  var fence = new Array(8);

  //AUDIO INITIALISATION FOR THE GAME

  //AUTOMATIC FENCE GENERATION FOR EACH LEVEL
  for (i = 0; i < fence.length; i++) {
    fence[i] = new Array();
  }
  fence[0] = [];
  // BLANK FENCE 1
  for (i = 0; i < 48; i++) {
    fence[1].push({ x: i * 20, y: 0 }, { x: i * 20, y: 620 });
  }
  for (i = 1; i < 31; i++) {
    fence[1].push({ y: i * 20, x: 0 }, { y: i * 20, x: 940 });
  }
  //LEVEL 2 FENCE
  for (i = 0; i < 7; i++) {
    fence[2].push(
      { x: i * 20, y: 0 },
      { x: 940 - i * 20, y: 0 },
      { x: i * 20, y: 620 },
      { x: 940 - i * 20, y: 620 },
      { x: 0, y: i * 20 },
      { x: 0, y: 620 - i * 20 },
      { x: 940, y: i * 20 },
      { x: 940, y: 620 - i * 20 },
    );
  }
  const level2ShiftX = 220;
  const level2ShiftY = 200;
  for (i = 0; i < 25; i++) {
    fence[2].push(
      { x: i * 20 + level2ShiftX, y: level2ShiftY },
      { x: i * 20 + level2ShiftX, y: 620 - level2ShiftY },
    );
  }
  // LEVEL 3  FENCE
  const level3ShiftX = 300;
  const level3ShiftY = 100;
  for (i = 0; i < 20; i++) {
    fence[3].push(
      { x: level3ShiftX, y: 620 - i * 20 },
      { x: 940 - level3ShiftX, y: i * 20 },
    );
  }
  for (i = 0; i < 20; i++) {
    fence[3].push(
      { x: i * 20, y: level3ShiftY },
      { x: 940 - i * 20, y: 620 - level3ShiftY },
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
  const level4ShiftX = 300;
  const level4ShiftY = 100;
  const Y_Offet = 120;
  for (i = 0; i < 20; i++) {
    fence[4].push(
      { x: +level4ShiftX, y: level4ShiftY + Y_Offet + i * 20 },
      { x: 940 - level4ShiftX, y: level4ShiftY + i * 20 },
    );
  }
  // LEVEL 5 FENCE HORIZONTALS
  for (i = 0; i < 10; i++) {
    fence[5].push({ x: i * 20, y: 0 });
  }
  for (i = 16; i < 35; i++) {
    fence[5].push({ x: i * 20, y: 0 });
  }
  for (i = 0; i < 26; i++) {
    fence[5].push({ x: i * 20, y: 260 });
  }
  for (i = 34; i < 48; i++) {
    fence[5].push({ x: i * 20, y: 260 });
  }
  for (i = 0; i < 48; i++) {
    fence[5].push({ x: i * 20, y: 460 });
  }
  //VERTICALS
  for (i = 1; i <= 8; i++) {
    fence[5].push({ x: 0, y: i * 20 });
  }
  for (i = 1; i <= 12; i++) {
    fence[5].push({ x: 500, y: i * 20 });
  }
  for (i = 1; i <= 12; i++) {
    fence[5].push({ x: 700, y: 460 + i * 20 });
  }
  //LEVEL 6 FENCE
  for (i = 0; i < 48; i++) {
    fence[6].push({ x: i * 20, y: 320 });
  }
  for (i = 0; i < 48; i++) {
    fence[6].push({ x: 460, y: i * 20 });
  }
  //LEVEL 7 FENCE
  for (i = 0; i < 48; i++) {
    fence[7].push({ x: i * 20, y: 420 });
  }
  for (i = 0; i < 11; i++) {
    fence[7].push({ x: 240, y: 420 + i * 20 }, { x: 740, y: 420 + i * 20 });
  }
  // END OF FENCE GENERATION SECTION

  //CO-ORDINATES FOR SHOWING SNAKE game_over
  const gameOver = new Array();

  //GENRERATE 5 PIX HORIZONTALS
  for (i = 0; i < 5; i++) {
    gameOver.push(
      { x: 200 + i * 20, y: 20 },
      { x: 200 + i * 20, y: 140 },
      { x: 40 + i * 20, y: 360 },
      { x: 40 + i * 20, y: 600 },
      { x: 40 + i * 20, y: 20 },
      { x: 40 + i * 20, y: 260 },
      { x: 40 + i * 20, y: 140 },
      { x: 140, y: 160 + i * 20 },
    );
  }

  //GENRERATE 12 PIX HORIZONTALS
  for (i = 0; i < 12; i++) {
    gameOver.push({ x: 180, y: i * 20 + 40 }, { x: 300, y: i * 20 + 40 });
  }

  //GENRERATE 11 PIX HORIZONTALS
  for (i = 0; i < 11; i++) {
    gameOver.push({ x: 20, y: i * 20 + 40 });
  }

  //13 pixel vertials
  for (i = 0; i < 13; i++) {
    gameOver.push(
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
      { x: 520, y: 360 + i * 20 },
    );
  }
  //GERERATE 6 PIXESLS
  for (i = 0; i < 6; i++) {
    gameOver.push(
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
      { x: 620, y: 600 },
    );
  }

  //SHIFT POSTION OF GAME OVER
  for (i = 0; i < gameOver.length; i++) {
    gameOver[i].x += 120;
  }

  // SNAKEDIRECTION DICTIONARY CREATIION

  // SCORE  AND DISPLAY LEVEL INITIALISATION
  let score = 0;
  let level = 1;
  // KEYPRESS AND EXECUTION FLAG( USED TO PREVENT MULTIPLE STROKES WHICH LEADS TO SNAKE BIT )
  let key_executed = true;

  // ARROW KEY LISTNER FOR SNAKE CONTROLS
  document.addEventListener('keydown', function(e) {
    const keyCode = e.keyCode;
    console.log(keyCode);
    const keyList = { 39: false, 40: false, 37: false, 38: false };
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
        audioButtonPress.play();
      } else if (
        keyCode === 40 &&
        direction != SnakeDirections.UP &&
        key_executed
      ) {
        key_executed = false;
        direction = SnakeDirections.DOWN;
        audioButtonPress.play();
      } else if (
        keyCode === 37 &&
        direction != SnakeDirections.RIGHT &&
        key_executed
      ) {
        key_executed = false;
        direction = SnakeDirections.LEFT;
        audioButtonPress.play();
      } else if (
        keyCode === 38 &&
        direction != SnakeDirections.DOWN &&
        key_executed
      ) {
        key_executed = false;
        direction = SnakeDirections.UP;
        audioButtonPress.play();
      }
    }
  });
  foodMaker();

  // ANIMATE FUNCTION IS USED TO REFRESH THE CANVAS
  function animate() {
    scoreBoardContext.clearRect(0, 0, 959, 639);
    scoreBoardContext.fillStyle = '#384619';

    // LOOP FOR DRAWING SNAKE
    for (var i = 0; i < snake.length; i++) {
      scoreBoardContext.fillRect(snake[i].x, snake[i].y, 19, 19);

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
    snakeGameContext.background = '#000000';
    snakeGameContext.font = '20px sans-serif';
    snakeGameContext.clearRect(0, 0, 959, 100);
    snakeGameContext.fillText('SCORE BOARD :' + score, 15, 40);
    snakeGameContext.fillText('LEVEL :' + level, 15, 80);
    snakeshift();
    key_executed = true;
    var snake_head = {
      x: snake[snake.length - 1].x,
      y: snake[snake.length - 1].y,
    };
    if (snake_head.x === foodLocationX && snake_head.y === foodLocationY) {
      console.log('Passed Food');
      audioFoodCaptured.play();
      snakeshift();
      score = score + 1;
      foodMaker();
      if (score % 10 == 0) {
        snake = [{ x: 40, y: 180 }, { x: 60, y: 180 }, { x: 80, y: 180 }];
        direction = SnakeDirections.RIGHT;
        gameLevel = gameLevel + 1;
        foodMaker();
        if (gameLevel === 8) {
          gameLevel = 0;
          REFRESH_DELAY = REFRESH_DELAY - 20;
          clearInterval(animationSetIntervalID);
          animationSetIntervalID = setInterval(animate, REFRESH_DELAY);
          level = level + 1;
        }
      }
    }
    for (var i = 0; i < snake.length - 2; i++) {
      if (snake_head.x === snake[i].x && snake_head.y === snake[i].y) {
        wallHit();
      }
    }
    for (var i = 0; i < fence[gameLevel].length; i++) {
      if (
        snake_head.x === fence[gameLevel][i].x &&
        snake_head.y === fence[gameLevel][i].y
      ) {
        selfBite();
      }
    }
    for (var i = 0; i < fence[gameLevel].length; i++) {
      scoreBoardContext.fillRect(
        fence[gameLevel][i].x,
        fence[gameLevel][i].y,
        19,
        19,
      );
    }
  }
  // showGameOverScreen();
  let animationSetIntervalID = setInterval(animate, REFRESH_DELAY);
  // animationSetIntervalID = requestAnimationFrame(animate);
  function snakeshift() {
    last_pos = snake[snake.length - 1];
    switch (direction) {
      case 1:
        snake.push({ x: last_pos.x + SNAKE_POSITION_OFFSET, y: last_pos.y });
        break;
      case 2:
        snake.push({ x: last_pos.x, y: last_pos.y + SNAKE_POSITION_OFFSET });
        break;
      case 3:
        snake.push({ x: last_pos.x - SNAKE_POSITION_OFFSET, y: last_pos.y });
        break;
      case 4:
        snake.push({ x: last_pos.x, y: last_pos.y - SNAKE_POSITION_OFFSET });
        break;
    }
  }
  function foodMaker() {
    (foodLocationX = Math.round(Math.random() * 38) * 20),
      (foodLocationY = Math.round(Math.random() * 38) * 20);
    console.log(foodLocationX, foodLocationY);
    while (foodLocationX > 920 || foodLocationY > 600) {
      foodLocationX = Math.round(Math.random() * 38) * 20;
      foodLocationY = Math.round(Math.random() * 38) * 20;
    }

    try {
      var total_length = fence[gameLevel].length || 0;
    } catch (err) {
      var total_length = 0;
    }
    for (i = 0; i < total_length; i++) {
      if (
        fence[gameLevel][i].x === foodLocationX &&
        fence[gameLevel][i].y === foodLocationY
      ) {
        foodLocationX = Math.round(Math.random() * 38) * 20;
        foodLocationY = Math.round(Math.random() * 38) * 20;
        i = 0;
      }
    }
  }
  function snakeFoodDraw() {
    // Draws Snake Food On Screen
    scoreBoardContext.fillRect(foodLocationX + 6, foodLocationY, 6, 6);
    scoreBoardContext.fillRect(foodLocationX + 6, foodLocationY + 12, 6, 6);
    scoreBoardContext.fillRect(foodLocationX, foodLocationY + 6, 6, 6);
    scoreBoardContext.fillRect(foodLocationX + 12, foodLocationY + 6, 6, 6);
  }
  function wallHit() {
    audioWallHit.play();
    setTimeout(showGameOverScreen, 2000);

    clearInterval(animationSetIntervalID);
  }

  function selfBite() {
    audioSelfBite.play();

    setTimeout(showGameOverScreen, 2000);
    clearInterval(animationSetIntervalID);
  }
  function showGameOverScreen() {
    scoreBoardContext.clearRect(0, 0, 959, 639);
    scoreBoardContext.fillStyle = '#384619';
    for (i = 0; i < gameOver.length; i++) {
      scoreBoardContext.fillRect(gameOver[i].x, gameOver[i].y, 19, 19);
    }
  }
};
