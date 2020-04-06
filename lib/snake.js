module.exports = function snake () {
  "use strict";
  const { Terminal } = require("command-line-draw");

  const terminal = new Terminal({
    width: 40,
    height: 20,
    border: "double"
  });

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

  function draw () {
    terminal.clear();
    terminal.drawBox(apple[0] * 2, apple[1], 2, 1, "red");
    for (let pixel of snake) {
      terminal.drawBox(pixel[0] * 2, pixel[1], 2, 1, "green");
    }
  }
  draw();
};