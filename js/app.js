// Enemies our player must avoid
var Enemy = function(initialY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -90;
    this.y = initialY;
    this.getSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //if enemy don't reach a right wall - move it to right
    if (this.x < 505)
        this.x = this.x + this.speed * dt;
    //if enemy reached a right wall - move it to begining and change its speed
    else {
        this.x = -90;
        this.getSpeed();
    }
};

//get random speed for enemies
Enemy.prototype.getSpeed = function() {
    this.speed = Math.floor(Math.random() * 100) + 20;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // The image/sprite for our hero, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    //initial position for the hero
    this.reset();
};

Player.prototype.update = function(dt) {
    //if player reached water - he won!
    if (this.y == 0)
        gameover();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 10);
};

//player go to initial position
Player.prototype.reset = function() {
    this.x = 2;
    this.y = 5;
}

Player.prototype.handleInput = function(key) {
    //player can't move outside the canvas
    switch (key) {
        case 'up':
            if (this.y != 0)
                --this.y;   
            break;
        case 'down':
            if (this.y != 5)
                ++this.y;
            break;
        case 'left':
            if (this.x != 0)
                --this.x;
            break;
        case 'right':
            if (this.x != 4)
            ++this.x;
            break;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies, player;

//what to do then game is starting
function gameStart() {
    const startGame = document.getElementById('startgame');
    startGame.style = "display: none";
    const win = document.getElementById('win');
    win.style = "display: none;"
    allEnemies = [];
    //one enemy for each row besides first and last row
    enemyYPositions = [65, 148, 231, 314];
    enemyYPositions.forEach(element => {
        let enemy = new Enemy(element);
        allEnemies.push(enemy);   
    });

    player = new Player();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//what to do then game is over
function gameover() {
    gamestart = false;
    const startGame = document.getElementById('startgame');
    startGame.style = "display: block";
    const canvas = document.getElementById('canvas');
    canvas.style = "display: none";
    const win = document.getElementById('win');
    win.style = "display: block;"
}