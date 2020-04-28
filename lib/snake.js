module.exports = function snake () {
  "use strict";
  const { Terminal } = require("command-line-draw");
  const flags = require("./flags")();

  const size = flags.s || flags.size || 20;
  const terminal = new Terminal({
    width: size * 2,
    height: size,
    border: "double",
    color: {
      background: "black",
      foreground: "white"
    }
  });
  const directions = {
    up: 0,
    down: 1,
    left: 2,
    right: 3
  };
  const init = {
    length: 5,
    apple: Int8Array.of(size - 5, size / 2),
    snake: [
      Int8Array.of(2, size / 2),
      Int8Array.of(3, size / 2),
      Int8Array.of(4, size / 2),
      Int8Array.of(5, size / 2),
      Int8Array.of(6, size / 2)
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
    if (direction !== directions.right && direction !== undefined) nextDirection = directions.left;
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
    if (length <= snake.length) {
      terminal.clearMode = true;
      const removed = snake.shift();
      terminal.drawBox(removed[0] * 2, removed[1], 2, 1);
      terminal.clearMode = false;
    }
    if (head[0] < 0 || head[0] >= size || head[1] < 0 || head[1] >= size || snake.some(e => e[0] === head[0] && e[1] === head[1])) {
      gameOver();
      return;
    }
    snake.push(head);
    terminal.drawBox(head[0] * 2, head[1], 2, 1, "green");
    let appleMoved = false;
    while (snake.some(e => e[0] === apple[0] && e[1] === apple[1])) {
      apple = Int8Array.of(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20));
      appleMoved = true;
    }
    if (appleMoved) terminal.drawBox(apple[0] * 2, apple[1], 2, 1, "red");
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
    const scoreStr = "Score: " + length;
    terminal.write(scoreStr, (terminal.width - scoreStr.length) / 2, (terminal.height - 0.5) / 3 + 1);
    terminal.drawBox(Math.round((terminal.width - 11) / 2), Math.round((terminal.height - 1.5) * 2 / 3), 11, 3);
    terminal.write("R:RESTART", Math.round((terminal.width - 11) / 2) + 1, Math.round((terminal.height - 1.5) * 2 / 3) + 1, "black", "white");
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