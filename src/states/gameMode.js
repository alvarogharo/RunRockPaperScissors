RunRockPaperScissors.gameModeState = function(game) {

}

RunRockPaperScissors.gameModeState.prototype = {

    preload: function() {
        game.load.image('best1Button', 'assets/sprites/buttons/bestOf1Button.png');
        game.load.image('best3Button', 'assets/sprites/buttons/bestOf3Button.png');
        game.load.image('best5Button', 'assets/sprites/buttons/bestOf5Button.png');
    },

    create: function() {

        var text = game.add.bitmapText(130, 100+100, 'myFont', 'GAME', 120);
        text = game.add.bitmapText(130, 260+100, 'myFont', 'Mode', 120);
        text.smoothed = false;
        text.color = 'white';

        var best1Button = game.add.button(200, 750, 'best1Button', best1, this, 2, 1, 0);
        var best3Button = game.add.button(200, 1100, 'best3Button', best3, this, 2, 1, 0);
        var best5Button = game.add.button(200, 1450, 'best5Button', best5, this, 2, 1, 0);
    },

    update: function() {

    }
}

function best1(){
    mode = 1;
    game.state.start('waitingState');
}

function best3(){
    mode = 3;
    game.state.start('waitingState');
}

function best5(){
    mode = 5;
    game.state.start('waitingState');
}