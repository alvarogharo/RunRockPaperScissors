RunRockPaperScissors.gameModeState = function(game) {
    var best1Button;
    var best3Button;
    var best5Button;
}

RunRockPaperScissors.gameModeState.prototype = {

    preload: function() {
        //Buttons
        game.load.image('best1Button', 'assets/sprites/buttons/bestOf1Button.png');
        game.load.image('best1ButtonOver', 'assets/sprites/buttons/bestOf1ButtonOver.png');
        game.load.image('best1ButtonDown', 'assets/sprites/buttons/bestOf1ButtonDown.png');
        game.load.image('best3Button', 'assets/sprites/buttons/bestOf3Button.png');
        game.load.image('best3ButtonOver', 'assets/sprites/buttons/bestOf3ButtonOver.png');
        game.load.image('best3ButtonDown', 'assets/sprites/buttons/bestOf3ButtonDown.png');
        game.load.image('best5Button', 'assets/sprites/buttons/bestOf5Button.png');
        game.load.image('best5ButtonOver', 'assets/sprites/buttons/bestOf5ButtonOver.png');
        game.load.image('best5ButtonDown', 'assets/sprites/buttons/bestOf5ButtonDown.png');
    },

    create: function() {
        //Text
        var text = game.add.bitmapText(130, 100+100, 'myFont', 'GAME', 120);
        text = game.add.bitmapText(130, 260+100, 'myFont', 'Mode', 120);
        text.smoothed = false;

        //Buttons
        best1Button = new Button(200,750,'best1Button',function(){this.best(1)},this);
        best3Button = new Button(200,1100,'best3Button',function(){this.best(3)},this);
        best5Button = new Button(200,1450,'best5Button',function(){this.best(5)},this);
    },

    //Button actions
    best: function(m){
        game.sound.play('buttonClicked');
        mode = m;
        game.state.start('waitingState');
    }
}