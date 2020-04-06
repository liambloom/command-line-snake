# Snake
This is snake in the command line, written in NodeJS.

![](https://badgen.net/npm/v/command-line-snake)
![](https://badgen.net/badge/node/>=12.0.0/green)
![](https://badgen.net/npm/dt/command-line-snake)
![](https://badgen.net/badge/licence/MIT)

# Installation

```
$ npm i -g command-line-snake
```

# Usage

Once installed, run `snake` in your command line. Use the arrow keys to control the snake, eat the apple, and try not to crash into yourself or the wall.

## Options

```
$ snake [-s <value> | --size <value>]
```

# Troubleshooting
Tips for how to fix various errors you may encounter while running this program
## 'snake' is not recognized 

```
'snake' is not recognized as an internal or external command, 
operable program or batch file.
```

### Solution 1

Make sure you installed snake globally. You do this by running the command
```
$ npm i -g command-line-snake
```
Notice the **`-g`**, that is what makes the install global.

### Solution 2

If it is installed globally, make sure that the 'npm' is in your PATH. For instructions on how to do that, see [this stackoverflow post](https://stackoverflow.com/questions/30710550/node-js-npm-modules-installed-but-command-not-recognized#36168581).

## Undexpected '#'

```
SyntaxError: Invalid or unexpected token '#'
```

### Solution 1

Make sure that you have at least node version 12 installed. You can check your node version by running the command

```
$ node -v
```

You can install the latest version of node [here](https://nodejs.org/en/).

## Playing field too large

```
Playing field is larger than terminal. Please make terminal larger to continue. 
```

### Solution 1

Make your command line window bigger.

### Solution 2

Make the snake board smaller

```
$ snake -s <size>
```