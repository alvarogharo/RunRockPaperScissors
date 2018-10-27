RunRockPaperScissors.winnerState = function(game) {

}

var winner;

RunRockPaperScissors.winnerState.prototype = {
    init: function(w){
        winner = w;
    },

    preload: function() {
        game.load.image('replayButton', 'assets/sprites/buttons/replayButton.png');
        game.load.image('mainMenuButton', 'assets/sprites/buttons/mainMenuButton.png');

        game.load.image('p1', 'assets/sprites/players/p1.png');
        game.load.image('p2', 'assets/sprites/players/p2.png');
    },

    create: function() {
        var scale = 45;
        var text = game.add.bitmapText(130, 100+100, 'myFont', 'WINNER', 120);
        if (winner == 1){
            text = game.add.bitmapText(130, 260+100, 'myFontB', 'P1', 120);
            var p1 = game.add.sprite(350, 550, 'p1');   
            p1.scale.set(scale,scale);
            p1.smoothed = false;
        }else if (winner == 2){
            text = game.add.bitmapText(130, 260+100, 'myFontR', 'P2', 120);
            var p2 = game.add.sprite(350, 550, 'p2');   
            p2.scale.set(scale,scale);
            p2.smoothed = false;
        }
        text.smoothed = false;
        text.color = 'white';

        var replayButton = game.add.button(200, 1100, 'replayButton', replay, this, 2, 1, 0);
        var mainMenuButton = game.add.button(200, 1450, 'mainMenuButton', mainMenu, this, 2, 1, 0);

        replayButton.onInputOver.add(over, this);
        replayButton.onInputOut.add(out, this);
        replayButton.onInputUp.add(up, this);

        mainMenuButton.onInputOver.add(over, this);
        mainMenuButton.onInputOut.add(out, this);
        mainMenuButton.onInputUp.add(up, this);
    },

    update: function() {

    }
}

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function replay(){
    score = [0,0];
    game.state.start('gameState');
}

function mainMenu(){
    game.state.start('mainMenuState');
}