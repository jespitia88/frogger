// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 10;
    this.y = Math.random() * 250;
    this.width = 20;
    this.height = 20;
    this.speed = 10 + Math.random() * 200;
    this.speed = this.getspeed();
    return this;
};

var Player = function() {

    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.width = 20;
    this.height = 20;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if(this.x > 600) {
        this.x = 0;
    }
    return;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getspeed = function() {
    var random = Math.random() + .25;
    if(Math.floor(random)<1)
    {
        return 50;
    }
    else
    {
        return 100;
    }
};



Player.prototype.update = function(dt) {
    if(this.y < 0 || 
       this.y > 400 ||
       this.x < 0 ||
       this.x > 400) {
        this.x = 200;
        this.y = 400;
    }
};

Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(keys) {
    switch(keys) {
        case 'left':
            this.x = this.x - 30;
        break;

        case 'right':
            this.x = this.x + 30;
        break;

        case 'up':
            this.y = this.y - 30;
        break;

        case 'down':
            this.y = this.y +30;
        break;
    }
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
//var enemy2 = new Enemy();
//var enemy3 = new Enemy();
var allEnemies = [];


allEnemies.push(enemy1);
//allEnemies.push(enemy2);
//allEnemies.push(enemy3);

var player = new Player();


Enemy.prototype.checkCollision = function() {
    if(player.x < this.x + this.width &&
       player.x + player.width > this.x &&
       player.y < this.y + this.height &&
       player.height + player.y > this.y) {
        player.x = 200;
        player.y = 400;
       }
};




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
