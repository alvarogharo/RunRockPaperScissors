RunRockPaperScissors.gameModeState = function(game) {

}

RunRockPaperScissors.gameModeState.prototype = {

    preload: function() {
        //Buttons
        game.load.image('best1Button', 'assets/sprites/buttons/bestOf1Button.png');
        game.load.image('best3Button', 'assets/sprites/buttons/bestOf3Button.png');
        game.load.image('best5Button', 'assets/sprites/buttons/bestOf5Button.png');
    },

    create: function() {
        //Text
        var text = game.add.bitmapText(130, 100+100, 'myFont', 'GAME', 120);
        text = game.add.bitmapText(130, 260+100, 'myFont', 'Mode', 120);
        text.smoothed = false;

        //Buttons
        var best1Button = game.add.button(200, 750, 'best1Button', this.best1, this, 2, 1, 0);
        var best3Button = game.add.button(200, 1100, 'best3Button', this.best3, this, 2, 1, 0);
        var best5Button = game.add.button(200, 1450, 'best5Button', this.best5, this, 2, 1, 0);
    },

    //Button actions
    best1: function(){
        mode = 1;
        game.state.start('waitingState');
    },
    
    best3: function(){
        mode = 3;
        game.state.start('waitingState');
    },
    
    best5: function(){
        mode = 5;
        game.state.start('waitingState');
    }
}