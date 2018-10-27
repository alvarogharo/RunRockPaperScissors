RunRockPaperScissors.versusState = function(game) {

}

var timer;
var p1;
var p2;
var scale;

RunRockPaperScissors.versusState.prototype = {
    init: function(player1, player2){
        p1 = player1;
        p2 = player2;
    },

    preload: function() {
        game.load.image('backButton', 'assets/sprites/buttons/backButton.png');
        game.load.image('creditsBanner', 'assets/sprites/credits/creditsBanner.png');

        game.load.image('rock', 'assets/sprites/objects/rock.png');
        game.load.image('paper', 'assets/sprites/objects/paper.png');
        game.load.image('scissors', 'assets/sprites/objects/scissors.png');
        game.load.image('nothing', 'assets/sprites/objects/nothing.png');

        game.load.bitmapFont('myFont', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
    },

    create: function() {
        scale = 12;

        p1 = 'nothing';
        p2 = 'rock';

        var text = game.add.bitmapText(260, 450, 'myFont', 'P1', 80);
        
        text = game.add.bitmapText(730, 450, 'myFont', 'P2', 80);
        
        var text = game.add.bitmapText(450, 580, 'myFont', 'VS', 120);
        text.smoothed = false;

        switch (p1){
            case 'rock':
                var obj1 = game.add.sprite(250, 640, 'rock');
                obj1.scale.set(scale,scale);
                obj1.smoothed = false;
                break;
            case 'paper':
                var obj1 = game.add.sprite(260, 640, 'paper');
                obj1.scale.set(scale,scale);
                obj1.smoothed = false;
                break;
            case 'scissors':
                var obj1 = game.add.sprite(250, 640, 'scissors');
                obj1.scale.set(scale,scale);
                obj1.smoothed = false;
                break;
            case 'nothing':
                var obj1 = game.add.sprite(250, 640, 'nothing');
                obj1.scale.set(scale,scale);
                obj1.smoothed = false;
                break;
        }

        switch (p2){
            case 'rock':
                var obj2 = game.add.sprite(740, 640, 'rock');
                obj2.scale.set(scale,scale);
                obj2.smoothed = false;
                break;
            case 'paper':
                var obj2 = game.add.sprite(750, 640, 'paper');
                obj2.scale.set(scale,scale);
                obj2.smoothed = false;
                break;
            case 'scissors':
                var obj2 = game.add.sprite(740, 640, 'scissors');
                obj2.scale.set(scale,scale);
                obj2.smoothed = false;
                break;
            case 'nothing':
                var obj2 = game.add.sprite(740, 640, 'nothing');
                obj2.scale.set(scale,scale);
                obj2.smoothed = false;
                break;
        }
        

        timer = 0;
    },

    update: function() {
        game.debug.text('Elapsed seconds: ' + timer, 32, 32);
        timer += game.time.physicsElapsed;

        if (timer >= 3){
            game.state.start('scoreState');
        }
    }
}