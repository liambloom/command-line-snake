module.exports = function snake () {
  "use strict";
  const { Terminal } = require("command-line-draw");

  const terminal = new Terminal({
    width: 40,
    height: 20,
    border: "double"
  });
  const directions = {
    up: 0,
    down: 1,
    left: 2,
    right: 3
  };
  const init = {
    length: 5,
    apple: Int8Array.of(15, 10),
    snake: [
      Int8Array.of(2, 10),
      Int8Array.of(3, 10),
      Int8Array.of(4, 10),
      Int8Array.of(5, 10),
      Int8Array.of(6, 10)
    ]
  };
  let length = init.length;
  let apple = init.apple.map(e => e);
  let snake = init.snake.map(e => e.map(el => el));
  let direction, nextDirection, loopId;
  terminal.on("up", () => {
    if (direction !== directions.down) nextDirection = directions.up;
    startGame();
  });
  terminal.on("down", () => {
    if (direction !== directions.up) nextDirection = directions.down;
    startGame();
  });
  terminal.on("left", () => {
    if (direction !== directions.right) nextDirection = directions.left;
    startGame();
  });
  terminal.on("right", () => {
    if (direction !== directions.left) nextDirection = directions.right;
    startGame();
  });
  function startGame () {
    if (direction === undefined) {
      frame();
      loopId = setInterval(frame, 100);
    }
  }
  function frame () {
    const head = Int8Array.from(snake[snake.length - 1]);
    direction = nextDirection;
    switch (direction) {
      case directions.right:
        head[0]++;
        break;
      case directions.left:
        head[0]--;
        break;
      case directions.down:
        head[1]++;
        break;
      case directions.up:
        head[1]--;
        break;
    }
    if (head[0] === apple[0] && head[1] === apple[1]) length += 3;
    if (length <= snake.length) snake.shift();
    if (head[0] < 0 || head[0] >= 20 || head[1] < 0 || head[1] >= 20 || snake.some(e => e[0] === head[0] && e[1] === head[1])) {
      gameOver();
      return;
    }
    snake.push(head);
    while (snake.some(e => e[0] === apple[0] && e[1] === apple[1])) apple = Int8Array.of(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20));
    draw();
  }
  function draw () {
    terminal.clear();
    terminal.drawBox(apple[0] * 2, apple[1], 2, 1, "red");
    for (let pixel of snake) {
      terminal.drawBox(pixel[0] * 2, pixel[1], 2, 1, "green");
    }
  }
  function gameOver () {
    clearInterval(loopId);
    terminal.clear();
    terminal.write("GAME OVER", (terminal.width - 9) / 2, (terminal.height - 0.5) / 3);
    terminal.drawBox(Math.round((terminal.width - 11) / 2), Math.round((terminal.height - 1.5) * 2 / 3), 11, 3);
    terminal.write("R:RESTART", Math.round((terminal.width - 11) / 2) + 1, Math.round((terminal.height - 0.5) * 2 / 3), "black", "white");
    terminal.once("r", restart);
  }
  function restart () {
    terminal.clear();
    length = init.length;
    apple = init.apple.map(e => e);
    snake = init.snake.map(e => e.map(el => el));
    direction = undefined;
    draw();
  }
  draw();
};