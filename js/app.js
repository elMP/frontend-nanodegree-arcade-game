// Enemies our player must avoid
var Enemy = function(initialY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -90;
    this.y = initialY;
    this.speed = Math.floor(Math.random() * 100) + 20;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505)
        this.x = this.x + this.speed * dt;
    else {
        this.x = -90;
        this.speed = Math.floor(Math.random() * 100) + 10;
    }
    //console.log(this.y);
};

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
    this.x = 2;
    this.y = 5;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 10);
};

Player.prototype.handleInput = function(key) {
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
let allEnemies = [];
let enemyYPositions = [65, 148, 231, 314];
enemyYPositions.forEach(element => {
    let enemy = new Enemy(element);
    allEnemies.push(enemy);   
});

let player = new Player();

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