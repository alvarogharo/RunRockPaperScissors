CatCatcher.levelState = function(game) {

}

var score;

var up;
var down;
var left;
var right;

var hor;
var ver;

var speed;
var cursors;

var cat;
var catcher;

CatCatcher.levelState.prototype = {

    

    preload: function() {
        
    },

    create: function() {
        score = 0;
        speed = 500;

        game.add.sprite(0,0,'background');
        cat = game.add.sprite(game.world.randomX, game.world.randomY, 'cat');
        catcher = game.add.sprite(200, 200, 'catcher');

        game.physics.enable(cat, Phaser.Physics.ARCADE);
        game.physics.enable(catcher, Phaser.Physics.ARCADE);

        cat.body.immovable = true;

        catcher.body.velocity.x = 0;
        catcher.body.velocity.y = 0;

        cursors = game.input.keyboard.createCursorKeys();
    },

    update: function() {
        hor = cursors.left.isDown - cursors.right.isDown;
        ver = cursors.up.isDown - cursors.down.isDown;
        
        catcher.body.velocity.x = -hor * speed;
        catcher.body.velocity.y = -ver * speed;

        game.physics.arcade.collide(catcher, cat, collisionHandler, null, this);
    }
}

function collisionHandler(){
    cat.body.x = game.world.randomX;
    cat.body.y = game.world.randomY;
    if (score < 3){
        score++;
    }else{
        game.state.start('endingState');
    }
}